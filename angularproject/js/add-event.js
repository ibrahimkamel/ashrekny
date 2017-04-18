jQuery.extend(jQuery.validator.messages, {
    required: "أدخل البيانات من فضلك",
    date: "التاريخ غير صحيح",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("أدخل عنوان مكون من 5 حروف على الأقل"),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
});