function yukle() {
	function yorumKutuAc() {
		document.querySelector("li#tab-yorumlar").classList.add("active");

		digerTablar.forEach(item => {
			var digerTab = document.querySelector("li."+ item);
			digerTab.classList.remove("active");
		})

		Array.from(document.querySelectorAll("div.classifiedOtherDetails > div")).slice(1).forEach(item => {
      item.style.display = "none";
		});

		document.querySelector("div#yorumkutu").style.display = "block";
	}

	var digerTablar = []
	document.querySelectorAll('div#classified-tabs ul li').forEach(item => {
		digerTablar.push(item.classList[0]);
	})

	var ul = document.querySelector("div#classified-tabs ul")
	var li = document.createElement("li");
	var a = document.createElement("a");
	var linkyazi = document.createTextNode("İlan Yorumları");

	li.id="tab-yorumlar";
	a.appendChild(linkyazi);
	li.appendChild(a);
	ul.appendChild(li);
	li.addEventListener("click", yorumKutuAc);

	var globalYorumTabi = document.querySelector("li#tab-yorumlar");

	digerTablar.forEach(item => {
		var digerTab = document.querySelector("li."+ item);
		digerTab.addEventListener('click', event => {
			globalYorumTabi.classList.remove("active");
			document.querySelector("div#yorumkutu").style.display = "none";
		  })
	})

	var altKisim = document.querySelector("div.classifiedOtherDetails");

	var yorumBox = document.createElement("div");
	yorumBox.classList.add("mini-tab-content");
	yorumBox.id="yorumkutu";
	yorumBox.style.display = "none";

	var yorumBoxUi = document.createElement("div");
	yorumBoxUi.classList.add("uiBox");
	yorumBoxUi.innerHTML = `
	<div class="uiBoxTitle">
        <h3 class="uiDetailTitle">
            <a href="#classifiedYorum">Yorumlar</a>
        </h3>
    </div>
    <div id="classifiedYorum" class="uiBoxContainer">
    <p id="yorumduyuru"></p>
    <div id="disqus_thread"></div>
	<noscript>Yorumları görebilmek için Javascript'i aktifleştirin</noscript>
	</div>
	`;
	yorumBox.appendChild(yorumBoxUi);

	altKisim.appendChild(yorumBox);

	duyuruUrl = "https://raw.githubusercontent.com/muratcesmecioglu/sahibinden-yorum/master/duyuru.txt";
    if (window.XMLHttpRequest)
    { xmlhttp=new XMLHttpRequest(); }
    else
    { xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            document.querySelector("p#yorumduyuru").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", duyuruUrl, false);
    xmlhttp.send();    

	var disqus_config = function () {
	this.page.url = location.href;
	this.page.identifier = document.querySelector("input#classifiedIdValue").value;
	};
	(function() {
	var d = document, s = d.createElement('script');
	s.src = 'https://sahibindenyorum.disqus.com/embed.js';
	s.setAttribute('data-timestamp', +new Date());
	(d.head || d.body).appendChild(s);
	})();

}
yukle();
console.log("Sahibinden Yorum v4 - Loaded")