const form = new Jslidate({
    inputs: [{
        selector: '.input',
        rules: [minLength(1), maxLength(5)],
    }, {
        selector: '.input2',
        rules: [minLength(2), maxLength(19)],
    }],
    form: {
        selector: '.form',
    },
});