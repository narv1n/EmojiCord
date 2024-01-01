var container = document.createElement('div')
container.id = 'container'
container.style.position = 'fixed'
container.style.top = '50%'
container.style.left = '50%'
container.style.transform = 'translate(-50%, -50%)'
container.style.backgroundColor = '#2C2F33'
container.style.border = '1px solid #ccc'
container.style.borderRadius = '10px'
container.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)'
container.style.overflow = 'hidden'
container.style.maxWidth = '400px'
container.style.width = '100%'
container.style.cursor = 'move'
container.style.zIndex = '9999'
document.body.appendChild(container)
var div = document.createElement('div')
div.id = 'div'
div.textContent = 'EmojiCord | Made By github.com/Mevipshia | Show/Hide UI Prefix: CTRL + X | Instructions: Click An Emoji Icon, CTRL + V In Chat'
div.style.padding = '10px'
div.style.color = 'white'
div.style.textAlign = 'center'
div.style.cursor = 'grab'
div.style.userSelect = 'none'
div.style.backgroundColor = '#2C2F33'
div.style.borderBottom = '1px solid #ccc'
container.appendChild(div)
var list = document.createElement('div')
list.className = 'emoji-container'
list.id = 'list'
list.style.display = 'none'
list.style.flexWrap = 'wrap'
list.style.padding = '10px'
list.style.maxHeight = '300px'
list.style.overflowY = 'auto'
container.appendChild(list)
if (window.location.href.includes('ptb.')) {
    run(window.location.href.replace(window.location.href.toString(), 'https://ptb.discord.com'))
}
if (window.location.href.includes('canary.')) {
    run(window.location.href.replace(window.location.href.toString(), 'https://canary.discord.com'))
}
if (window.location.href.includes('https://discord.com')) {
    run(window.location.href.replace(window.location.href.toString(), 'https://discord.com'))
}
document.addEventListener('keydown', function (key) {
    if (key.ctrlKey && key.key === 'x') {
        if (container.style.display === 'none' || container.style.display === '') {
            container.style.display = 'block'
        } else {
            container.style.display = 'none'
        }
    }
})
function run(url) {
    console.log(url)
    fetch(`${url}/api/v9/users/@me/guilds`, {
        method: 'GET',
        headers: {
            'Authorization': (webpackChunkdiscord_app.push([[''],{},e=>{m=[];for(var c in e.c)m.push(e.c[c])}]),m).find(m=>m?.exports?.default?.getToken!==void 0).exports.default.getToken()
        }
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        for (var count = 0; count < data.length; count++) {
            console.log(data[count]['id'])
            fetch(`${url}/api/v9/guilds/${data[count]['id']}/emojis`, {
                method: 'GET',
                headers: {
                    'Authorization': (webpackChunkdiscord_app.push([[''],{},e=>{m=[];for(var c in e.c)m.push(e.c[c])}]),m).find(m=>m?.exports?.default?.getToken!==void 0).exports.default.getToken()
                }
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                for (var count = 0; count < data.length; count+=1) {
                    console.log(data[count]['name'])
                    function display_emoji(emojiId) {
                        var item = document.createElement('img')
                        item.className = 'emoji-item'
                        if (['true', 'True', true].includes(data[count]['animated'].toString())) {
                            item.src = `https://cdn.discordapp.com/emojis/${emojiId}.gif?size=48&quality=lossless`
                            item.setAttribute('animated-emoji-id', emojiId)
                        } else {
                            item.src = `https://cdn.discordapp.com/emojis/${emojiId}.webp?size=48&quality=lossless`
                            item.setAttribute('noanimation-emoji-id', emojiId)
                        }
                        item.style.width = '48px'
                        item.style.height = '48px'
                        item.style.margin = '5px'
                        item.style.cursor = 'pointer'
                        list.appendChild(item)
                        item.addEventListener('click', function (event) {
                            event.stopPropagation()
                            var textarea = document.createElement('textarea')
                            if (item.hasAttribute('animated-emoji-id') == true) {
                                textarea.value = `https://cdn.discordapp.com/emojis/${item.getAttribute('animated-emoji-id')}.gif?size=48&quality=lossless`
                            } else {
                                textarea.value = `https://cdn.discordapp.com/emojis/${item.getAttribute('noanimation-emoji-id')}.webp?size=48&quality=lossless`
                            }
                            document.body.appendChild(textarea)
                            textarea.select()
                            document.execCommand('copy')
                            document.body.removeChild(textarea)
                        })
                    }
                    display_emoji(data[count]['id'])
                }
                list.style.display = 'block'
            })
        }
    })
}
drag(container)
function drag(element) {
    var dragging = false,
        X,
        Y
    div.addEventListener('mousedown', function (e) {
        dragging = true
        X = e.clientX - element.getBoundingClientRect().left
        Y = e.clientY - element.getBoundingClientRect().top
        element.style.cursor = 'grabbing'
    })
    document.addEventListener('mousemove', function (e) {
        if (!dragging) {
            return
        }
        var x = e.clientX - X
        var y = e.clientY - Y
        element.style.left = x + 'px'
        element.style.top = y + 'px'
    })
    document.addEventListener('mouseup', function () {
        dragging = false
        element.style.cursor = 'grab'
    })
}
