// ==UserScript==
// @name         Guri-Script
// @version      2.3.0
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
  let expanded = button.getAttribute("data-expanded") === "true";
  
  document.querySelectorAll('a[href^="javascript:detalhesTurma("]').forEach(function(link) { 
      if (expanded) {
          if (link.dataset.expanded === "true") {
              link.click();
          }
      } else {
          if (link.dataset.expanded === "false") {
              link.click();
          }
      }
    });
  
    button.innerHTML = expanded ? "Expandir todos os detalhes" : "Fechar todos os detalhes";
    button.setAttribute("data-expanded", expanded ? "false" : "true");
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
  
  function updateProgressBar() {
    let maxLoad = 540; // Maximum workload in hours
    let requestedLoad = parseInt(document.querySelector("#chSol").innerText); // Requested workload in hours
    let percentage = (requestedLoad / maxLoad) * 100; // Calculate the percentage
    
    // Update the progress bar
    let progressBar = document.querySelector("#progress-bar");
    progressBar.style.width = `${percentage}%`;
    progressBar.innerText = `${percentage.toFixed(2)}%`;
    
    // Set the color of the progress bar based on the percentage
    if (percentage <= 50) {
        progressBar.classList.remove("bg-warning");
        progressBar.classList.remove("bg-danger");
        progressBar.classList.add("bg-success");
    } else if (percentage <= 80) {
        progressBar.classList.remove("bg-success");
        progressBar.classList.remove("bg-danger");
        progressBar.classList.add("bg-warning");
    } else {
        progressBar.classList.remove("bg-success");
        progressBar.classList.remove("bg-warning");
        progressBar.classList.add("bg-danger");
    }
  }
  
  // Add a progress bar to show the requested workload
  let progressBar = document.createElement("div");
  progressBar.classList.add("progress-bar", "bg-success");
  progressBar.id = "progress-bar";
  progressBar.style.width = "0%";
  progressBar.setAttribute("role", "progressbar");
  progressBar.setAttribute("aria-valuenow", "0");
  progressBar.setAttribute("aria-valuemin", "0");
  progressBar.setAttribute("aria-valuemax", "100");

  
  
  let progress = document.createElement("div");
  progress.classList.add("progress");
  progress.appendChild(progressBar);
  
  let choosenClassesCard = document.querySelector("#turmas_escolhidas").parentElement;
  choosenClassesCard.appendChild(progress);
  
  // Call the function to initialize the progress bar
  updateProgressBar(); 

})();
