$(document).ready(function() {
    $("#bootbox").on("click", function(event) {
                var modal = bootbox.dialog({
                    message: $(".form-content").html(),
                    title: "New Item",
                    buttons: [{
                        label: "Save",
                        className: "btn btn-primary pull-left",
                        callback: function() {
                            var form = modal.find(".form");
                            var items = form.serializeJSON();

                            console.log(items);



                            var username = items.name;                
                            var today = new Date();
                            var dd = today.getDate();
                            var mm = today.getMonth()+1; //January is 0!

                            var yyyy = today.getFullYear();
                            if(dd<10){
                                dd='0'+dd;
                            } 
                            if(mm<10){
                                mm='0'+mm;
                            } 
                            var date = mm+'/'+dd+'/'+yyyy;
                            $.post("http://localhost:3000/adduser",{name: username, date: date}, function(data){
                                if(data==='done')
                                {
                                    alert("user added!!!");
                                }
                            });
                            /* This part you have to complete yourself :D
                            if (your_form_validation(items)) {
                              // Make your data save as async and then just call modal.modal("hide");
                            } else {
                              // Show some errors, etc on form
                            }
                            */

                            return true;
                        }
                    }, {
                        label: "Close",
                        className: "btn btn-default pull-left",
                        callback: function() {
                            console.log("just do something on close");
                        }
                    }],
                    show: false,
                    onEscape: function() {
                        modal.modal("hide");
                    }
                });

                modal.modal("show");
    });

    jQuery.fn.serializeJSON = function() {
                var json = {};

                jQuery.map(jQuery(this).serializeArray(), function(n) {
                    var _ = n.name.indexOf('[');

                    if (_ > -1) {
                        var o = json,
                            _name;

                        _name = n.name.replace(/\]/gi, '').split('[');

                        for (var i = 0, len = _name.length; i < len; i++) {
                            if (i == len - 1) {
                                if (o[_name[i]]) {
                                    if (typeof o[_name[i]] == 'string') {
                                        o[_name[i]] = [o[_name[i]]];
                                    }

                                    o[_name[i]].push(n.value);
                                } else {
                                    o[_name[i]] = n.value || '';
                                }
                            } else {
                                o = o[_name[i]] = o[_name[i]] || {};
                            }
                        }
                    } else if (json[n.name] !== undefined) {
                        if (!json[n.name].push) {
                            json[n.name] = [json[n.name]];
                        }

                        json[n.name].push(n.value || '');
                    } else {
                        json[n.name] = n.value || '';
                    }
                });

                return json;
    };

 
});

$(".remove").bind('click',function(e) {
        var id = $(this).val();
        $.post("http://localhost:3000/deleteitem",{id: id}, function(data){
            if(data==='done')
            {
                alert("item deleted!!");
            }
        });
    });