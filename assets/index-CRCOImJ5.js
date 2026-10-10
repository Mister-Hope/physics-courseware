import{t as e}from"./courses.config-COAaURFt.js";var t=``,n=e=>`<span class="tag">${e}</span>`,r=e=>`<a class="course-card" href="/${e.slug}/" target="_blank">
      <div class="card-chapter">${e.chapter}</div>
      <h3 class="card-title">${e.title}</h3>
      <p class="card-desc">${e.description}</p>
      <div class="card-footer">
        <div class="card-tags">
          ${e.tags.map(n).join(``)}
        </div>
      </div>
    </a>`,i=()=>{let n=document.querySelector(`#course-grid`);if(!n)return;n.classList.add(`is-flat`);let i=t?e.filter(e=>e.slug===t).flatMap(e=>e.courses):e.flatMap(e=>e.courses);n.innerHTML=i.length===0?`<div class="group-empty">暂无课件</div>`:i.map(e=>r(e)).join(``)},a=()=>{let n=document.querySelector(`#tabs`);n&&(n.innerHTML=`<button class="tab${t===``?` active`:``}" data-slug="">全部</button>`+e.map(e=>`<button class="tab${t===e.slug?` active`:``}" data-slug="${e.slug}">${e.shortName}</button>`).join(``),n.querySelectorAll(`.tab`).forEach(e=>{e.addEventListener(`click`,()=>{t=e.dataset.slug??``,a(),i()})}))},o=document.querySelector(`#footer-year`);o&&(o.textContent=String(new Date().getFullYear())),a(),i();