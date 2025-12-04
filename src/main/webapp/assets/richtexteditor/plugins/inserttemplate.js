

RTE_DefaultConfig.plugin_inserttemplate = RTE_Plugin_InsertTemplate;

function RTE_Plugin_InsertTemplate() {



    var obj = this;

    var config, editor;

    obj.PluginName = "InsertTemplate";

    obj.InitConfig = function (argconfig) {
        config = argconfig;
    }
    obj.InitEditor = function (argeditor) {
        editor = argeditor;

        editor.attachEvent("exec_command_inserttemplate", function (state, cmd, value) {
            state.returnValue = true;
            obj.DoInsertTemplate();
        });


    }

    function __Append(parent, tagname, csstext, cssclass) {
        var tag = parent.ownerDocument.createElement(tagname);
        if (csstext) tag.style.cssText = csstext;
        if (cssclass) tag.className = cssclass;
        parent.appendChild(tag);
        return tag;
    }

    obj.DoInsertTemplate = function () {

        var dialoginner = editor.createDialog(editor.getLangText("inserttemplatetitle"), "rte-dialog-inserttemplate");

        var scrollpanel = __Append(dialoginner, "rte-inserttemplate-scrollpanel", "overflow-y:auto;padding-bottom:32px;");
        var container = __Append(scrollpanel, "rte-inserttemplate-container", "display:flex;flex-wrap:wrap;");

        container.focus();//focus to let ESC key close dialog

        function CreateDiv(item) {
            var text = item[0];
            var html = item[1];
            console.log(item, text, html);

            var divitem = __Append(container, "rte-inserttemplate-image-item", "cursor:pointer;width:256px;height:256px;margin:12px;box-shadow:0 0 8px #ccc;display:flex;align-items:center;justify-content:center;")
            var div = __Append(divitem, "div", "max-width:90%;max-height:90%;overflow:auto;");
            var innerdiv = __Append(div, "div");
            innerdiv.innerHTML = html;
            div.title = text;

            var scale = Math.min(200 / div.scrollWidth, 200 / div.scrollHeight);
            if (scale < 1) {

                var tx, ty;
                tx = ty = (Math.max(div.scrollWidth, div.scrollHeight) - 200) / 2;
                innerdiv.style.transform = "scale(" + scale + ") translate(-" + tx + "px,-" + ty + "px)";
                div.style.overflow = "hidden";
            }

            divitem.onclick = function () {
                editor.setHTMLCode(html);
                dialoginner.close();
            }
        }

        for (var i = 0; i < config.htmlTemplates.length; i++) {
            var item = config.htmlTemplates[i];
            CreateDiv(item);
        }

    }
}




