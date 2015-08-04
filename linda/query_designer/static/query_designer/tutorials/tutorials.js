    var last_shown_tooltip = '';

    //intervals
    var INTERVAL_VERY_LONG = 8000;
    var INTERVAL_LONG = 6000;
    var INTERVAL_NORMAL = 5000;
    var INTERVAL_SHORT = 4000;
    var INTERVAL_VERY_SHORT = 3000;

    //show a new tooltip
    function tooltip(selector, text, position) {
        toolbar_destroy();

        $(selector).tooltipster({
            content: text,
            trigger: 'custom',
            contentAsHTML: true,
            position: position,
            interactive: true
        });
        $(selector).tooltipster('show');

        last_shown_tooltip = selector;
    }

    //destroy an existing toolbar
    function toolbar_destroy() {
        if (last_shown_tooltip != "") {
            $(last_shown_tooltip).tooltipster('destroy');
            $(last_shown_tooltip).attr('title', '');
        }
        last_shown_tooltip = '';
    }

    //check if the URIs of the properties in the p_arr have been added to the instance i
    function check_properties(i, p_arr) {
        if (builder_workbench.instances[i].selected_properties.length >= p_arr.length) {
                var n_of_found = 0;
                for (var p=0; p<builder_workbench.instances[i].selected_properties.length; p++) {
                    for (var j=0; j<p_arr.length; j++) {
                        if (builder_workbench.instances[i].selected_properties[p].uri == p_arr[j]) {
                            n_of_found++;
                            if (n_of_found == p_arr.length) {
                                break;
                            }
                        }
                    }
                }

            return n_of_found == p_arr.length//all properties are are added
        }
    }

    //wait for instance of type `class_uri` to be added
    function wait_new_instance(class_uri, callback) {
        var len = builder_workbench.instances.length;
        var interval = setInterval(function() {
            if (builder_workbench.instances.length > len) {
                if (builder_workbench.instances[builder_workbench.instances.length - 1].uri == class_uri) {
                    clearInterval(interval);
                    callback();
                }
            }
        }, 500);
    }