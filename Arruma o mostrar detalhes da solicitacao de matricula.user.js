// ==UserScript==
// @name         Arruma o mostrar detalhes da solicitacao de matricula
// @version      1
// @description  Remove a segunda parte da string de todos os botões com a função detalhesTurma() na página de solicitar matrícula no Guri.
// @match        https://guri.unipampa.edu.br/pta/solicitar_matricula/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.querySelectorAll('a[href^="javascript:detalhesTurma("]').forEach(function(link) { 
        link.setAttribute('href', link.getAttribute('href').replace(/\$\('#div_dados_sm_\d+'\)\.toggle\(\);/, '')); 
    });

})();
