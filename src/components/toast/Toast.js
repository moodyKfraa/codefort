
function Toast(msg) {
    const df = `
      <div class= "content">
        <p>${msg}</p>
      <div class= "overlay">
      </div>
    </div>`
let node = document.createElement('div')
node.className = 'toast'
node.innerHTML =df
node.style.zIndex=10
    document.body.append(node);
    setTimeout(() => {
        node.remove()
    }, 10000);
}

export default Toast