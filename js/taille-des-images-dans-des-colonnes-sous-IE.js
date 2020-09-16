//gestion des taille d'images des articles pour IE qui ne reconnait pas "max-width"
var  tailleImageIe = function(imgArticle) {
	// 1. la taille de l'écran impose la taille des colonnes (déclarées en %)
	var browserWidth = window.innerWidth;// largeur de la fenêtre du navigateur
	var pageWidth;// largeur de la page, avec ou sans menu. Par défaut égale au browser
	var menuWidth = 281;// largeur du menu
	var gutterWidth = 20;
	var wrapperImg = imgArticle.parentNode;//le wrapper "p" de l'image
	var wrapperImgOneWidth;// pour 1 colonne > largeur du wrapper "p" de l'image
	var wrapperImgSmallWidth;// pour 2 colonnes > largeur du wrapper "p" de la petite image 
	var wrapperImgBigWidth;// pour 2 colonnes > largeur du wrapper "p" de la grande image 
	var margesRestantes;// largeur des marges restantes (contenu - image(s))
	var margesRestantes2cols;// largeur des marges restantes (contenu - image(s)) pour deux colonnes avec menus
	var typeCol;// type de colonne : col-md-4, col-md-8, col-md-12

	if(browserWidth <= 768) {// sans menu
		pageWidth = browserWidth;
		margesRestantes = 116;
		wrapperImgOneWidth = pageWidth - margesRestantes;
		wrapperImgSmallWidth = pageWidth - margesRestantes;
		wrapperImgBigWidth = pageWidth - margesRestantes;
	} else if((769 <= browserWidth) && (browserWidth < 992)) {// avec menu
		pageWidth = browserWidth;
		margesRestantes = 126;
		wrapperImgOneWidth = pageWidth - menuWidth - gutterWidth - margesRestantes;
		wrapperImgSmallWidth = pageWidth - menuWidth - gutterWidth - margesRestantes;
		wrapperImgBigWidth = pageWidth - menuWidth - gutterWidth - margesRestantes;
	} else if((browserWidth >= 992) && (browserWidth <= 1280)) {
		pageWidth = browserWidth;
		margesRestantes = 126;
		wrapperImgOneWidth = pageWidth - menuWidth - gutterWidth - margesRestantes;
		// il ya des marges assymétriques prises dans les colonnes en pourcentages !
		// les images ne font donc pas 66,66% et 33,33%
		// mais -après calcul des marges immuables - 69% et 31%
		margesRestantes2cols = 165;
		wrapperImgSmallWidth = 0.3185*(pageWidth - menuWidth - gutterWidth - margesRestantes2cols);
		wrapperImgBigWidth = 0.6815*(pageWidth - menuWidth - gutterWidth - margesRestantes2cols);
		
	} else if (browserWidth > 1280) {
		pageWidth = 1280;// max de la page
		margesRestantes = 182;
		wrapperImgOneWidth = pageWidth - menuWidth - gutterWidth - margesRestantes;
		margesRestantes2cols = 165;
		wrapperImgSmallWidth = 0.3185*(pageWidth - menuWidth - gutterWidth - margesRestantes2cols);
		wrapperImgBigWidth = 0.6815*(pageWidth - menuWidth - gutterWidth - margesRestantes2cols);
	}

	// 2. déterminer si l'image est dans une publication une ou deux colonnes
	// trouver les classes du container parent et ne conserver que celle en "col-md-" :
	var containerImgClassesArray = imgArticle.offsetParent.className.split(' ');//string convertie en array
	containerImgClassesArray.forEach(function(myClass){
		if(myClass.indexOf('col-md') !== -1) {
			// cela permet de déduire le type de colonne wrappante
			typeCol = myClass; 
		}
	});

	
	// 3. Si l'image est plus grande que sa colonne parent, on la réduit pour la faire rentrer dedans
	switch (typeCol) {
		case "col-md-12":
			if(imgArticle.naturalWidth > wrapperImgOneWidth) {
				imgArticle.parentNode.style.width = wrapperImgOneWidth + 'px';
			}
			break;
		case "col-md-8":
			if(imgArticle.naturalWidth > wrapperImgBigWidth) {
				imgArticle.parentNode.style.width = wrapperImgBigWidth + 'px';
			}
			break;
		case "col-md-4":
			if(imgArticle.naturalWidth > wrapperImgSmallWidth) {
				imgArticle.parentNode.style.width = wrapperImgSmallWidth + 'px';
			}
	}
	// on contraint de toute façon l'image wrappée par le "p"
	//TO FIX : ne fonctionne pas
	imgArticle.style.width = 'inherit !important';
};


window.addEventListener("DOMContentLoaded", function() {
		// lister toutes les images des nouveaux articles pour IE afin de redefinir leurs tailles
		if(document.documentElement.classList.contains("ie")) {
			[].forEach.call(document.querySelectorAll(".article-v7 img:not(.p_profil):not(.user-icon)"), function(imgArticle) {
				tailleImageIe(imgArticle);
			});
		}

		window.onresize = function() {
			if(document.documentElement.classList.contains("ie")) {
				[].forEach.call(document.querySelectorAll(".article-v7 img:not(.p_profil):not(.user-icon)"), function(imgArticle) {
					tailleImageIe(imgArticle);
				});
			}
		}
});