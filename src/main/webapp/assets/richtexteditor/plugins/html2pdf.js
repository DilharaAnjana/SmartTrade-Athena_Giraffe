

if (!RTE_DefaultConfig.svgCode_html2pdf) {
	RTE_DefaultConfig.svgCode_html2pdf = '<svg viewBox="-2 -2 36 36" fill="#5F6368"><polygon points="30 11 30 9 22 9 22 23 24 23 24 17 29 17 29 15 24 15 24 11 30 11"></polygon><path d="M8,9H2V23H4V18H8a2,2,0,0,0,2-2V11A2,2,0,0,0,8,9Zm0,7H4V11H8Z"></path><path d="M16,23H12V9h4a4,4,0,0,1,4,4v6A4,4,0,0,1,16,23Zm-2-2h2a2,2,0,0,0,2-2V13a2,2,0,0,0-2-2H14Z"></path><title>PDF</title></svg>'
}

RTE_DefaultConfig.plugin_html2pdf = RTE_Plugin_Html2PDF;

function RTE_Plugin_Html2PDF() {

	var scripturl = "https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js";

	var obj = this;

	var config, editor;

	obj.PluginName = "Html2PDF";

	obj.InitConfig = function (argconfig) {
		config = argconfig;
	}
	obj.InitEditor = function (argeditor) {
		editor = argeditor;

		editor.attachEvent("exec_command_html2pdf", function (state, cmd, value) {
			console.log(state, cmd, value);
			obj.DoHtml2PDF();
			state.returnValue = true;
		});

		editor.toolbarFactoryMap["html2pdf"] = function (cmd) {
			//console.log(cmd);
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

	obj.DoHtml2PDF = function () {

		var dialoginner = editor.createDialog("Html2PDF", "rte-dialog-html2pdf");

		var div2 = __Append(dialoginner, "div", "position:relative;text-align:center;");

		div2.innerHTML = "Loading...";

		var imgrect = __Append(dialoginner, "div", "position:relative;text-align:center;")

		window.html2pdf_callback = function (win) {

			if (!win.html2pdf) {
				div2.innerHTML = "Failed to load script.";
				return;
			}

			div2.innerHTML = "Exporting...";

			var opt = {
				margin: 0.5,
				filename: 'myfile.pdf',
				image: { type: 'jpeg', quality: 0.98 },
				html2canvas: { scale: 2 },
				jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
			};

			var promimg = win.html2pdf().set(opt).from(win.document.body).outputImg();
			promimg.then(function (img) {

				var dataurl = img.getAttribute('src');
				if (dataurl.indexOf("base64") == -1) {
					div2.innerHTML = "Error, no data.";
					return;
				}

				var imgblob = dataURLToBlob(dataurl);
				console.log(imgblob);
				var imgurl = URL.createObjectURL(imgblob);
				img.setAttribute("src", imgurl);

				var prom = win.html2pdf().set(opt).from(win.document.body).outputPdf();
				prom.then(function (str) {

					console.log("done", str.length)

					var bin = new Array(str.length);
					for (var i = 0; i < str.length; i++)
						bin[i] = str.charCodeAt(i);
					var blob = new Blob([new Uint8Array(bin)], { type: "application/pdf" })
					var url = URL.createObjectURL(blob);
					div2.innerHTML = Math.ceil(str.length / 1024) + "KB Exported<br/><a href='" + url + "' target=_blank>Download PDF</a>";

					var pdflink = div2.querySelector("a");

					var date = new Date();
					var ymd = String(date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()).substring(2);
					var hms = String(1000000 + date.getHours() * 10000 + date.getMinutes() * 100 + date.getSeconds()).substring(1);
					pdflink.download = "Export-" + ymd + "-" + hms + ".pdf";

					//a.rel = 'noopener'

					pdflink.click();

					img.style.cssText = "max-width:300px;max-height:200px;margin:5px;padding:10px;border:solid 1px #eee;box-shadow:2px 2px 6px #eee"
					imgrect.appendChild(img)

					__Append(imgrect, "br");
					var imglink = __Append(imgrect, "a");
					imglink.setAttribute("href", imgurl);
					imglink.setAttribute("target", "_blank");
					imglink.download = "Export-" + ymd + "-" + hms + ".jpg";
					imglink.innerText = "Download Img";

					//dialoginner.close();

				}).catch(function (x) {
					console.error(x);
				})

			}).catch(function (x) {
				console.error(x);
			})


		}

		var div1 = __Append(dialoginner, "div", "position:relative;text-align:center;");

		iframe = __Append(div1, "iframe", "align-self:center;flex:99;width:100%;height:0px;border:0px;", "rte-editable");
		iframe.contentDocument.open("text/html");
		iframe.contentDocument.write("<html><head><link id='url-css-preview' rel='stylesheet' href='" + editor.htmlEncode(config.previewCssUrl) + "'/>"
			+ "<script src='" + editor.htmlEncode(scripturl) + "'></script></head><body style='padding:10px;margin:0px'>"
			+ editor.getHTMLCode() + "</body>"
			+ "<script>window.onload=function(){setTimeout(function(){parent.html2pdf_callback(window)},100)}</script></html>")
		iframe.contentDocument.close();

	}
}




