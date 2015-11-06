'use strict';

/*
    index controller for handling front end interactions.
*/

jQuery(document).ready(function() {
    jQuery('.selectpicker').selectpicker();
    jQuery('.selectpicker').selectpicker({
        style: 'btn-info',
        size: 4
    });
    
    var person = prompt("Please enter your name", "");

    if (person != null) {
        var log_chat_message = function(message, type) {
            var li = jQuery('<li />').text(message);

            if (type === 'system') {
                li.css({
                    'font-weight': 'bold'
                });
            }
            jQuery('#chat_log').append(li);
        };

        var socket = io.connect('http://localhost:3000');

        socket.on('entrance', function(data) {
            document.getElementById("welcome").innerHTML = data.message;
        });

        socket.on('join', function(data) {
            log_chat_message(data.username, 'system');
        });

        socket.on('chat', function(data) {
            if (data.statuscode == 200) {
                log_chat_message(data.message, 'normal');
            }
        });

        socket.emit('join', {
            username: person
        });
        jQuery('#charttitle').hide();
        /* Chat Box functionality */
        jQuery('#chat_box').keypress(function(event) {
            if (event.which == 13) {

                var data = {
                    admin: person,
                    username: jQuery('#users').val(),
                    type: jQuery('#type').val(),
                    amount: jQuery('#amount_box').val(),
                    desc: jQuery('#chat_box').val()
                };
                switch (data.desc) {
                    case "@bot pie chart":
                        jQuery('#charttitle').show();
                        jQuery('#svgelem').empty();
                        socket.emit('chart', 'pie');
                        break;
                    case "@bot bar chart":
                        jQuery('#charttitle').show();
                        jQuery('#svgelem').empty();
                        socket.emit('chart', 'bar');
                        break;
                    default:
                        socket.emit('chat', data);
                }
                jQuery('#chat_box').val('');
            }
        });

        /* Add user to the text box */
        jQuery("#adduser").click(function() {
            var userName = jQuery('#usertextbox').val();
            $('#users').append($('<option>', {
                value: userName,
                text: userName
            }));
            jQuery('#usertextbox').val('');
            jQuery("#users").selectpicker('refresh');
        });

        /* Socket to emit - NVD3 PIE CHART */
        socket.on('chart', function(data) {
            switch (data.type) {
                case 'pie':
                    nv.addGraph(function() {
                        var chart = nv.models.pieChart()
                            .x(function(d) {
                                return d.username
                            })
                            .y(function(d) {
                                return d.amount
                            })
                            .showLabels(true);

                        d3.select("#chart svg")
                            .datum(data.records)
                            .transition().duration(1200)
                            .call(chart);

                        return chart;
                    });
                    break;
                case 'bar':
                    var newArr = [];
                    var newObj = {};
                    newObj['values'] = data.records;
                    newArr.push(newObj);
                    nv.addGraph(function() {
                        var chart = nv.models.discreteBarChart()
                            .x(function(d) {
                                return d.username
                            })
                            .y(function(d) {
                                return d.amount
                            })
                            .staggerLabels(true)
                            .tooltips(false)
                            .showValues(true)

                        d3.select('#chart svg')
                            .datum(newArr)
                            .transition().duration(500)
                            .call(chart);

                        nv.utils.windowResize(chart.update);

                        return chart;
                    });
                    break;
            }
        });
    }
});
