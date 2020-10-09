<template>
    <div class="simple-keyboard keyboard-num keyboard-num-single"></div>
</template>

<script>
    import Keyboard from "simple-keyboard";
    import "simple-keyboard/build/css/index.css";

    export default {
        name: "SimpleKeyboard",
        props: ['value'],
        data: () => ({
            keyboard: null,
            numpad: null,
            actions: null
        }),
        mounted() {
            let commonKeyboardOptions = {
                onChange: input => this.onChange(input),
                onKeyPress: button => this.onKeyPress(button),
                theme: "simple-keyboard hg-theme-default hg-theme-ios keyboard-num-single",
                physicalKeyboardHighlight: true,
                syncInstanceInputs: true,
                mergeDisplay: true,
                debug: false
            };

            this.numpad = new Keyboard('keyboard-num', {
                ...commonKeyboardOptions,
                layout: {
                    default: [
                        "1 2 3",
                        "4 5 6",
                        "7 8 9",
                        "{clear} 0 {bksp}"
                    ],
                },
                display: {
                    "{clear}": "C",
                    "{bksp}": "<i class=\"fas fa-backspace\"></i>",
                    "{hide}": "<i class=\"fas fa-keyboard\"></i>",
                }
            });
            this.numpad.setInput("");
        },
        methods: {
            onChange(input) {
                if(input === ""){
                    this.numpad.setInput("");
                    this.$emit("input", 1);
                }else{
                    this.$emit("input", input);
                }
            },
            onKeyPress(button) {
                this.$emit("onKeyPress", button);

                if (button.includes("{") && button.includes("}")) {
                    this.handleLayoutChange(button);
                }
            },
            handleLayoutChange(button) {
                switch (button) {
                    case "{clear}":
                        this.numpad.setInput("");
                        this.$emit("input", 1);
                        break;
                    // case "{shift}":
                    // case "{shiftactivated}":
                    // case "{default}":
                    //     if(currentLayout === "default"){
                    //         layoutName = "shift";
                    //     }else if(currentLayout === "shift"){
                    //         layoutName = "default";
                    //     }else if(currentLayout === "ru"){
                    //         layoutName = "shiftRu";
                    //     }else if(currentLayout === "shiftRu"){
                    //         layoutName = "ru";
                    //     }
                    //     break;
                    //
                    // case "{alt}":
                    // case "{altright}":
                    //     layoutName = currentLayout === "alt" ? "default" : "alt";
                    //     break;
                    //
                    // case "{lang}":
                    //     layoutName = currentLayout === "ru" ? "default" : "ru";
                    //     break;
                    //
                    // case "{hide}":
                    //     this.$emit('hide');
                    //     break;

                    default:
                        break;
                }
            }
        },
        watch: {
            input(input) {
                // console.log(input)
                // this.numpad.setInput(input);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .keyboard-num {
        padding: 0!important;
    }

    .keyboard-num-single {
        min-width: 100%!important;
        margin: 0 auto!important;

        .hg-button {
            height: 64px!important;
            min-height: 64px!important;
        }


    }


</style>
