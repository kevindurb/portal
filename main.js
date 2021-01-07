const $peer = document.getElementById('peer')
const $out = document.getElementById('out')
const $send = document.getElementById('send')
const $console = document.getElementById('console')

const peer = new Peer();
let outgoingConnection;

$peer.value = '';

const appendConsole = (message) => {
  $console.textContent += `\n${message}`
}

peer.on('connection', (conn) => {
  conn.on('open', () => {
    console.log(conn)
    appendConsole(`Connected to ${conn.peer}`)
    outgoingConnection = conn
    outgoingConnection.on('data', (data) => appendConsole(data))
  })
})

peer.on('open', (id) => {
  appendConsole(`Your Id: ${id}`);
})

$peer.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    appendConsole(`Connecting to ${$peer.value}`)
    outgoingConnection = peer.connect($peer.value);
    outgoingConnection.on('open', () => {
      appendConsole(`Connected to ${$peer.value}`)
      outgoingConnection.on('data', (data) => appendConsole(data))
    })
  }
})

$send.addEventListener('click', () => {
  if (outgoingConnection) {
    appendConsole(`Sending ${$out.value} to ${outgoingConnection.peer}`)
    outgoingConnection.send($out.value)
  }
  $out.value = ''
})
