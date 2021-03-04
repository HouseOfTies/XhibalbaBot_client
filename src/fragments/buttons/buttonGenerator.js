function buttonGenerator(controls){

    const button = {
    parse_mode : "Markdown",
        reply_markup : {
            inline_keyboard : [
                    controls
            ]
        }
    };

    return button;
}

export default buttonGenerator;