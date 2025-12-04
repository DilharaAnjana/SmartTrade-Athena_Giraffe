

RTE_DefaultConfig.plugin_insertgallery = RTE_Plugin_InsertGallery;

function RTE_Plugin_InsertGallery() {



	var obj = this;

	var config, editor;

	obj.PluginName = "InsertGallery";

	obj.InitConfig = function (argconfig) {
		config = argconfig;
	}
	obj.InitEditor = function (argeditor) {
		editor = argeditor;

		editor.attachEvent("exec_command_insertgallery", function (state, cmd, value) {
			state.returnValue = true;
			obj.DoInsertGallery();
		});


	}

	function __Append(parent, tagname, csstext, cssclass) {
		var tag = parent.ownerDocument.createElement(tagname);
		if (csstext) tag.style.cssText = csstext;
		if (cssclass) tag.className = cssclass;
		parent.appendChild(tag);
		return tag;
	}
	
	obj.DoInsertGallery = function () {

		var dialoginner = editor.createDialog(editor.getLangText("insertgallerytitle"), "rte-dialog-insertgallery");

		var scrollpanel = __Append(dialoginner, "rte-insertgallery-scrollpanel", "overflow-y:auto;padding-bottom:32px;");
		var container = __Append(scrollpanel, "rte-insertgallery-container", "display:flex;flex-wrap:wrap;");

		container.focus();//focus to let ESC key close dialog

		function CreateDiv(item) {
			var url, text;
			if (typeof (item) == "string") {
				url = item;
			} else if (item instanceof Array) {
				url = item[0];
				text = item[1];
			}
			else if (item && item.url) {
				url = item.url;
				text = item.text;
			}
			else {
				return;
			}

			var divitem = __Append(container, "rte-insertgallery-image-item", "cursor:pointer;width:128px;height:128px;margin:12px;box-shadow:0 0 8px #ccc;display:flex;align-items:center;justify-content:center;")
			var img = __Append(divitem, "img", "max-width:90%;max-height:90%;");
			img.src = url;

			divitem.onclick = function () {
				editor.insertImageByUrl(url);
				dialoginner.close();
			}
        }

		for (var i = 0; i < config.galleryImages.length; i++) {
			var item = config.galleryImages[i];
			CreateDiv(item);
        }

	}
}




