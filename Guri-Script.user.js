// ==UserScript==
// @name         Guri-Script
// @version      2.2.0
// @description  Remove a segunda parte da string de todos os botões com a função detalhesTurma() na página de solicitar matrícula no Guri e adiciona um botão para expandir todos os detalhes.
// @match        https://guri.unipampa.edu.br/pta/solicitar_matricula/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Remove the second part of the href attribute from all links with a function named detalhesTurma
    document.querySelectorAll('a[href^="javascript:detalhesTurma("]').forEach(function(link) {
        link.setAttribute('href', link.getAttribute('href').replace(/\$\('#div_dados_sm_\d+'\)\.toggle\(\);/, ''));
        link.dataset.expanded = "false";
        link.onclick = function() {
          this.dataset.expanded = this.dataset.expanded === "true" ? "false" : "true";
        };
    });
  
    // Function to expand all details
    function expandAll() {
        let button = document.querySelector("#expand-all-button");
        if (button.textContent === "Expandir todos os detalhes") {
            button.textContent = "Recolher todos os detalhes";
            document.querySelectorAll('a[href^="javascript:detalhesTurma("]').forEach(function(link) { 
                link.click();
                link.dataset.expanded = "true";
            });
        } else {
            button.textContent = "Expandir todos os detalhes";
            document.querySelectorAll('a[href^="javascript:detalhesTurma("][data-expanded="true"]').forEach(function(link) { 
                link.click();
                link.dataset.expanded = "false";
            });
        }
    }

    // Add a button to expand all the details
    let button = document.createElement("button");
    button.id = "expand-all-button";
    button.textContent = "Expandir todos os detalhes";
    button.onclick = expandAll;
  
    let headerTitles = document.querySelectorAll('.card-header b.card-title');
    headerTitles.forEach((header) => {
        if (header && header.innerText === "TURMAS OFERTADAS DA SUA GRADE CURRICULAR") {
            let cardHeader = header.parentElement; 
            cardHeader.appendChild(button);
            cardHeader.classList.add("d-flex", "justify-content-between");
        }
    });
})();
