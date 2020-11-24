<template>
    <div class="ui-keyboard p-3">
        <div class="simple-keyboard keyboard-main"></div>
        <div class="simple-keyboard keyboard-num"></div>
        <div class="simple-keyboard keyboard-actions"></div>
    </div>
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
                theme: "simple-keyboard hg-theme-default hg-theme-ios",
                physicalKeyboardHighlight: true,
                syncInstanceInputs: true,
                mergeDisplay: true,
            };

            this.keyboard = new Keyboard('keyboard-main', {
                ...commonKeyboardOptions,
                layout: {
                    ru: [
                        "й ц у к е н г ш щ з х ъ",
                        "ф ы в а п р о л д ж э \\",
                        "{shift} ё я ч с м и т ь б ю .",
                        "{lang} {space} {alt}"
                    ],
                    default: [
                        "q w e r t y u i o p [ ]",
                        "a s d f g h j k l ; ' \\",
                        "{shift} ` z x c v b n m , . /",
                        "{lang} {space} {alt}"
                    ],
                    shift: [
                        "Q W E R T Y U I O P { }",
                        "A S D F G H J K L : \" |",
                        "{shift} ~ Z X C V B N M < > ?",
                        "{lang} {space} {alt}"
                    ],
                    shiftRu: [
                        "Й Ц У К Е Н Г Ш Щ З Х Ъ",
                        "Ф Ы В А П Р О Л Д Ж Э /",
                        "{shift} Ë Я Ч С М И Т Ь Б Ю ,",
                        "{lang} {space} {alt}"
                    ],
                    alt: [
                        "! \" # $ % ^ & * ( ) - =",
                        "@ № ; % : ? * ( ) ` _ +",
                        "{shift} [ ] { } | \\ / < > ~ ±",
                        "{lang} {space} {alt}"
                    ]
                },
                display: {
                    "{alt}": "#+=",
                    "{smileys}": "\uD83D\uDE03",
                    "{shift}": "⇧",
                    "{lang}": "<i class=\"fas fa-globe\"></i>",
                    "{shiftactivated}": "⇧",
                    "{enter}": "return",
                    "{bksp}": "⌫",
                    "{altright}": ".?123",
                    "{downkeyboard}": "Скрыть",
                    "{space}": " ",
                    "{default}": "ABC",
                    "{back}": "⇦"
                }
            });

            this.numpad = new Keyboard('keyboard-num', {
                ...commonKeyboardOptions,
                layout: {
                    default: [
                        "1 2 3",
                        "4 5 6",
                        "7 8 9",
                        "0"
                    ],
                }
            });

            this.actions = new Keyboard('keyboard-actions', {
                ...commonKeyboardOptions,
                layout: {
                    default: [
                        "{bksp}",
                        "{enter}",
                        "{hide}"
                    ],
                },
                display: {
                    "{enter}": "<i class=\"fas fa-search\"></i>",
                    "{bksp}": "<i class=\"fas fa-backspace\"></i>",
                    "{hide}": "<i class=\"fas fa-keyboard\"></i><i class=\"fas fa-sort-down\"></i>",
                }
            });

            this.keyboard.setOptions({
                layoutName: 'ru'
            });

            this.keyboard.setInput(this.value);
        },
        methods: {
            onChange(input) {
                this.$emit("input", input);
            },
            onKeyPress(button) {
                this.$emit("onKeyPress", button);

                if (button.includes("{") && button.includes("}")) {
                    this.handleLayoutChange(button);
                }
            },
            handleLayoutChange(button) {
                let currentLayout = this.keyboard.options.layoutName;
                let layoutName;

                switch (button) {
                    case "{shift}":
                    case "{shiftactivated}":
                    case "{default}":
                        if (currentLayout === "default") {
                            layoutName = "shift";
                        } else if (currentLayout === "shift") {
                            layoutName = "default";
                        } else if (currentLayout === "ru") {
                            layoutName = "shiftRu";
                        } else if (currentLayout === "shiftRu") {
                            layoutName = "ru";
                        }
                        break;

                    case "{lang}":
                        if(currentLayout === 'shiftRu'){
                            layoutName = 'default'
                        }else{
                            layoutName = currentLayout === "ru" ? "default" : "ru";
                        }
                        break;

                    case "{alt}":
                    case "{altright}":
                        layoutName = currentLayout === "alt" ? "default" : "alt";
                        break;

                    case "{hide}":
                        this.$emit('hide');
                        break;

                    default:
                        break;
                }

                if (layoutName) {
                    this.keyboard.setOptions({
                        layoutName: layoutName
                    });
                }
            }
        },
        watch: {
            input(input) {
                this.keyboard.setInput(input);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
    .ui-keyboard {
        position: fixed;
        width: calc(100% - 33px);
        bottom: 36px;
        background-color: #070919;
        display: flex;
        border-bottom-right-radius: 0.65rem;
    }

    .keyboard-actions {

        width: 150px !important;
        margin: 0 !important;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .hg-button-hide {
            span {
                display: flex !important;
                flex-direction: column !important;
                align-items: center;

                .fa-sort-down {
                    line-height: 5px;
                }
            }

        }

        .hg-button-bksp {
            background-color: #f31736 !important;
            color: white !important;

        }

        .hg-row:nth-child(2) {
            flex: 1;

            .hg-button-enter {
                height: 100% !important;
            }


        }
    }

    .keyboard-num {
        width: 300px !important;
        margin-right: 60px !important;

    }

    .keyboard-main {
        flex: 1;
        margin-right: 60px !important;
    }


    /**
 * hg-theme-default theme
 */
    .simple-keyboard.hg-theme-ios {
        width: 900px;
        margin: auto;
    }

    .simple-keyboard.hg-theme-ios.hg-theme-default .hg-row .hg-button {
        flex-grow: 1;
        cursor: pointer;
        max-width: initial;
    }

    .simple-keyboard.hg-theme-ios .hg-row {
        display: flex;
    }

    .simple-keyboard.hg-theme-ios .hg-row:not(:last-child) {
        margin-bottom: 5px;
    }

    .simple-keyboard.hg-theme-ios .hg-row .hg-button:not(:last-child) {
        margin-right: 5px;
    }

    .simple-keyboard.hg-theme-ios .hg-row:nth-child(2) {
        margin-left: 0 !important;
    }

    .simple-keyboard.hg-theme-ios.hg-theme-default {
        background-color: transparent;
        padding: 5px;
        border-radius: 5px;
    }

    .simple-keyboard.hg-theme-ios.hg-theme-default.hg-layout-custom {
        background-color: #e5e5e5;
        padding: 5px;
    }

    .simple-keyboard.hg-theme-ios.hg-theme-default .hg-button {
        border-radius: 5px;
        box-sizing: border-box;
        padding: 0;
        background: white;
        border-bottom: 1px solid #b5b5b5;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: none;
        font-size: 26px;
        font-weight: 600;
        max-width: 76px;
        width: 76px;
        min-width: 76px;
        height: 76px;
        min-height: 76px;
    }

    .simple-keyboard.hg-theme-ios.hg-theme-default .hg-button.hg-standardBtn:active,
    .simple-keyboard.hg-theme-ios.hg-theme-default .hg-buttonhg-standardBtn:focus,
    .simple-keyboard.hg-theme-ios.hg-theme-default .hg-button.hg-button-space:active,
    .simple-keyboard.hg-theme-ios.hg-theme-default .hg-button.hg-button-space:focus,
    .hg-button.hg-functionBtn.hg-button-lang:focus,
    .hg-button.hg-functionBtn.hg-button-lang:active,
    .hg-button-enter:focus,
    .hg-button-enter:active,
    .hg-button-hide:active,
    .hg-button-hide:active {
        background: #e7e9f5 !important;
        color: #070919 !important;
    }





    .simple-keyboard.hg-theme-ios.hg-theme-default .hg-button.hg-functionBtn {

    }

    /*    .simple-keyboard.hg-theme-ios.hg-theme-default
        .hg-button.hg-button-shiftactivated {
            background-color: #3c44b1;
        }*/

    .hg-layout-shiftRu {
        .hg-button-shift {
            background-color: #3c44b1 !important;
            color: white;
        }

    }

    .hg-layout-shift {
        .hg-button-shift {
            background-color: #3c44b1 !important;
            color: white;
        }

    }

    .hg-layout-alt {
        .hg-button-alt {
            background-color: #3c44b1 !important;
            color: white;
        }
    }

    .simple-keyboard.hg-theme-ios.hg-theme-default .hg-button-space {
        max-width: 710px;
        min-width: 710px;

    }

    .simple-keyboard.hg-theme-ios.hg-theme-default .hg-button-enter {
        max-width: 80px;
        min-width: 80px;
    }

    .simple-keyboard.hg-theme-ios.hg-theme-default .hg-button-altright,
    .simple-keyboard.hg-theme-ios.hg-theme-default .hg-button-back {
        min-width: 80px;
        max-width: 80px;
    }
</style>
