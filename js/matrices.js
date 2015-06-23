var MT = MT || {};

var genbutton = document.getElementById('genButton');
var maincontainer = document.getElementById('mainContainer');

MT.matrice = function(n,p) {
    this.n = n ? n : Math.floor(9*Math.random()+1);
    this.p = p ? p : this.n;
    console.log('n: '+this.n+', p: '+this.p);
    this.array = new Int8Array((this.n)*(this.p));
    for(var i=0;i<this.n;i++) {
	for(var j=0;j<this.p;j++) {
	    var c = this.genCoeff();
	    //var c = Math.floor(19*Math.random()-9);
	    this.array[i+this.n*j] = c;
	}
    }
    this.div = document.createElement('div');
    this.div.classList.add('matriceDiv');
}
MT.matrice.prototype.genCoeff = function() {
    return Math.floor(19*Math.random()-9);
}
MT.matrice.prototype.genLatex = function() {
    this.latexString = '\\begin{pmatrix}\n';
    this.latexPre = document.createElement('pre');
    for(var i=0;i<this.n;i++) {
	for(var j=0;j<this.p;j++) {
	    var c = this.array[i+this.n*j];
	    if(c >=0 ) this.latexString += ' ';
	    this.latexString += c
	    if(j < (this.p-1)) this.latexString += ' & '
	    else this.latexString += ' ';
	}
	this.latexString += '\\\\\n'
    }
    this.latexString += '\\end{pmatrix}';
    this.latexPre.textContent = this.latexString;
    this.div.appendChild(this.latexPre);
    return this.latexString;
}
MT.matrice.prototype.genMathJax = function() {
    this.mathJaxContainer = document.createElement('div');
    this.div.appendChild(this.mathJaxContainer);
    this.mathJaxContainer.innerHTML = '$$'+this.latexString+'$$';
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
genbutton.addEventListener('click', function() {
    var matrice = new MT.matrice();
    //console.log(matrice);
    matrice.genLatex();
    maincontainer.appendChild(matrice.div);
    matrice.genMathJax();
});
