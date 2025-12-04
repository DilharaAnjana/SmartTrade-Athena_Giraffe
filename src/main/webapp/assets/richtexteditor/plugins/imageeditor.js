

if (!RTE_DefaultConfig.svgCode_imageeditor) {
	RTE_DefaultConfig.svgCode_imageeditor = '<svg viewBox="-2 -2 20 20" fill="#5F6368"><style>.st0{fill:#f6f6f6}.st1{fill:#424242}.st2{fill:none}.st3{fill:#f0eff1}</style><path class="st0" d="M1 0v6H0v10h10v-1h6V0z" id="outline"/><g id="icon_x5F_bg"><path class="st1" d="M2 5h1v1H2zM2 3h1v1H2zM2 1h1v1H2zM4 1h1.001v1H4zM6 1h1v1H6zM8 1h1v1H8zM10 1h1v1h-1zM12 1h1v1h-1zM14 1h1v1h-1zM14 3h1v1h-1zM14 5h1v1h-1zM14 7h1v1h-1zM14 9h1v1h-1zM14 10.999h1V12h-1zM14 13h1v1h-1zM12 13h1v1h-1zM11 11V5H5v1H4V4h8v7z"/><circle class="st1" cx="6.192" cy="9.807" r=".807"/><path class="st1" d="M1 7v8h8V7H1zm1 7.001v-.28l2.537-1.463L7.554 14l.001.001H2zm6-.93l-3.463-1.982L2 12.491v-4.49h6v5.07zM10 13h1v1h-1z"/></g><g id="icon_x5F_fg"><path class="st2" d="M2 14h5.554v.001H2z"/><path class="st3" d="M11 5v6h-1V6H5V5z"/><path class="st3" d="M2 12.491l2.537-1.402L8 13.071v-5.07H2v4.49zM6.192 9a.807.807 0 1 1 .001 1.615A.807.807 0 0 1 6.192 9z"/><path class="st3" d="M2 13.721V14h5.554l-3.017-1.742z"/></g></svg>';
}

RTE_DefaultConfig.plugin_imageeditor = RTE_Plugin_ImageEditor;

function RTE_Plugin_ImageEditor() {



	var obj = this;

	var config, editor;

	obj.PluginName = "ImageEditor";

	obj.InitConfig = function (argconfig) {
		config = argconfig;
	}
	obj.InitEditor = function (argeditor) {
		editor = argeditor;

		editor.attachEvent("exec_command_imageeditor", function (state, cmd, value) {
			obj.DoImageEditor();
			state.returnValue = true;
		});

		editor.toolbarFactoryMap["imageeditor"] = function (cmd) {
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
	
	function dataURLToBlob(dataurl) {
		var arr = dataurl.split(',');
		var mime = arr[0].match(/:(.*?);/)[1];
		var bstr = atob(arr[1]);
		var n = bstr.length;
		var u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], { type: mime });
	}

	obj.DoImageEditor = function () {

		var img = editor.getSelectedControl();
		if (!img)
			return;

		var dialoginner = editor.createDialog("ImageEditor", "rte-dialog-imageeditor");

		dialoginner.style.width = "90%";
		dialoginner.style.height = "90%";


		var scriptbase = config.url_base + "/plugins/tui.image-editor/";

		window.rte_image_editor_callback = function (win) {
			console.log(win);
			var options = {
				includeUI: {
					loadImage: {
						path: img.src,
						name: 'RteImage'
					},
					//locale: locale_ru_RU,
					theme: {
						// main icons
						'menu.normalIcon.path': scriptbase + 'svg/icon-d.svg',
						'menu.activeIcon.path': scriptbase + 'svg/icon-b.svg',
						'menu.disabledIcon.path': scriptbase + 'svg/icon-a.svg',
						'menu.hoverIcon.path': scriptbase + 'svg/icon-c.svg',
						// submenu icons
						'submenu.normalIcon.path': scriptbase + 'svg/icon-d.svg',
						'submenu.normalIcon.name': 'icon-d',
						'submenu.activeIcon.path': scriptbase + 'svg/icon-c.svg',
						'submenu.activeIcon.name': 'icon-c'
					},
					//initMenu: 'filter',
					menuBarPosition: 'bottom'
				},

				cssMaxWidth: 700,
				cssMaxHeight: 500,
				selectionStyle: {
					cornerSize: 20,
					rotatingPointOffset: 70
				}
			};
			var imgeditor = new win.tui.ImageEditor(win.document.querySelector('#tui-image-editor'), options);

			var btns = win.document.querySelector('.tui-image-editor-header-buttons');
			btns.innerHTML = '';
			var savebtn = __Append(btns, "button", "");
			savebtn.innerText = "Save";
			savebtn.onclick = function () {

				var dataurl = imgeditor.toDataURL();
				if (!config.file_upload_handler) {
					img.src = dataurl;
					editor.notifySelectionChange();
					dialoginner.close();
					return;
				}

				var file = dataURLToBlob(dataurl);

				config.file_upload_handler(file, function (url, error) {
					if (url) {
						img.src = url;
						editor.notifySelectionChange();
						dialoginner.close();
						return;
					}
					if (error) {
						//TODO:retry dialog or cancel
						alert("upload failed , TODO:show retry dialog or cancel");
					}
					else {
						alert("Developer warning : ");
					}
				});


			}

		}

		iframe = __Append(dialoginner, "iframe", "align-self:center;flex:99;width:100%;height:100%px;border:0px;", "rte-editable");
		iframe.contentDocument.open("text/html");
		iframe.contentDocument.write("<html><head><base href='" + editor.htmlEncode(location.href) + "'/>"
			+ "<link id='url-css-preview' rel='stylesheet' href='" + editor.htmlEncode(scriptbase + "tui-color-picker.min.css") + "'/>"
			+ "<link id='url-css-preview' rel='stylesheet' href='" + editor.htmlEncode(scriptbase + "tui-image-editor.min.css") + "'/>"
			+ "<script src='" + editor.htmlEncode(scriptbase + "fabric.min.js") + "'></script>"
			+ "<script src='" + editor.htmlEncode(scriptbase + "tui-color-picker.min.js") + "'></script>"
			+ "<script src='" + editor.htmlEncode(scriptbase + "tui-code-snippet.min.js") + "'></script>"
			+ "<script src='" + editor.htmlEncode(scriptbase + "tui-image-editor.min.js") + "'></script>"
			+ "</head><body style='padding:10px;margin:0px'><div id='tui-image-editor'></div></body>"
			+ "<script>window.onload=function(){setTimeout(function(){parent.rte_image_editor_callback(window)},100)}</script></html>")
		iframe.contentDocument.close();
	}
}




