
if (!RTE_DefaultConfig.svgCode_insertcode) {
	RTE_DefaultConfig.svgCode_insertcode = '<svg class="bi bi-file-earmark-code" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4 1h5v1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6h1v7a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2z"></path><path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 019 4.5z"></path><path fill-rule="evenodd" d="M8.646 6.646a.5.5 0 01.708 0l2 2a.5.5 0 010 .708l-2 2a.5.5 0 01-.708-.708L10.293 9 8.646 7.354a.5.5 0 010-.708zm-1.292 0a.5.5 0 00-.708 0l-2 2a.5.5 0 000 .708l2 2a.5.5 0 00.708-.708L5.707 9l1.647-1.646a.5.5 0 000-.708z" clip-rule="evenodd"></path></svg>';
}

RTE_DefaultConfig.plugin_insertcode = RTE_Plugin_InsertCode;

function RTE_Plugin_InsertCode() {



	var obj = this;

	var config, editor;

	obj.PluginName = "InsertCode";

	obj.InitConfig = function (argconfig) {
		config = argconfig;
	}
	obj.InitEditor = function (argeditor) {
		editor = argeditor;

		editor.attachEvent("exec_command_insertcode", function (state, cmd, value) {
			console.log(state, cmd, value);
			obj.DoInsertCode();
			state.returnValue = true;
		});

		editor.toolbarFactoryMap["insertcode"] = function (cmd) {
			console.log(cmd);
			var span = editor.createToolbarButton(cmd);
			span.style.backgroundColor = ''
			return span;
		};

	}

	function __Append(parent, tagname, csstext, cssclass) {
		var tag = parent.ownerDocument.createElement(tagname);
		if (csstext) tag.style.cssText = csstext;
		if (cssclass) tag.className = cssclass;
		parent.appendChild(tag);
		return tag;
	}


	obj.DoInsertCode = function () {

		var dialoginner = editor.createDialog("InsertCode", "rte-dialog-insertcode");

		var div1 = __Append(dialoginner, "div", "position:relative;text-align:center;");
		var textarea = __Append(div1, "textarea", "width:300px;height:200px")

		var divfooter = __Append(dialoginner, "rte-dialog-footer",null,"rte-dialog-footer-center");

		var btn = __Append(divfooter, "rte-dialog-button")
		btn.innerText = "Insert";

		setTimeout(function () {
			textarea.focus();
		}, 300);

		btn.onclick = function () {
			dialoginner.close();
			var p = editor.insertRootParagraph()
			var ctag = __Append(p, "code");
			ctag.innerText = textarea.value;
			editor.focus();
		}
	}
}




