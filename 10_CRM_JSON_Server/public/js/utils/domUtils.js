export function showAlert(e){const t=document.querySelector(".alert");t&&t.remove();const r=document.createElement("p");r.classList.add("alert","bg-red-100","border-red-400","text-red-700","px-4","py-3","rounded","relative","mb-4","mx-auto","text-center"),r.textContent=e;document.querySelector("#form").appendChild(r),setTimeout(()=>{r.remove()},3e3)}
//# sourceMappingURL=domUtils.js.map
