  $(document).ready(function() {
    $('#addEventForm').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            title: {
                validators: {
                        stringLength: {
                        min: 1,
                    },
                        notEmpty: {
                        message: 'أختر عنوان للإيفنت'
                    }
                }
            },
             description: {
                validators: {
                     stringLength: {
                        min: 1,
                    },
                    notEmpty: {
                        message: 'أدخل وصف للإيفنت'
                    }
                }
            },
            startDate: {
                validators: {
                    notEmpty: {
                        message: 'أدخل تاريخ الإيفنت'
                    },
                    date: {
                        format: 'YYYY-MM-DD'
                    }
                }
            },
            endDate: {
                validators: {
                    date: {
                        format: 'YYYY-MM-DD'
                    }
                }
            },
            city: {
                validators: {
                    notEmpty: {
                        message: 'اختر المحافظة'
                    }
                }
            },
            region: {
                validators: {
                    notEmpty: {
                        message: 'اختر المنطقة'
                    }
                }
            },
            }
        })
        .on('success.form.bv', function(e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                $('#addEventForm').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function(result) {
                console.log(result);
            }, 'json');
        });
});

