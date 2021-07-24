const tanah = document.querySelectorAll('.tanah')
const tikus = document.querySelectorAll('.tikus')
const papanScor = document.querySelector('.papanScor')

let t
let tanahSebelumnya;
let tikusSebelumnya;
let selesai
let scor
let waktu

function randomTanah() {
    t = Math.floor(Math.random() * tanah.length)
    const tRandom = tanah[t]
    if (tRandom == tanahSebelumnya) {
        randomTanah(tanah)
    }
    tanahSebelumnya = tRandom
    return tRandom
}
function randomTikus() {
    const tikusRandom = tikus[t]
    return tikusRandom
}
function randomWaktu(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function pesanSelesai() {

    Swal.fire({
        title: 'SCORE ANDA',
        html: '<h1>' + scor + '</h1>',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
}
function munculkanTikus() {
    const tRandom = randomTanah()
    const tikusRandom = randomTikus()
    const wRandom = randomWaktu(600, 800)
    tRandom.classList.add('muncul');
    tikusRandom.classList.add('ada');
    setTimeout(() => {
        tikusRandom.classList.remove('ada');
        tRandom.classList.remove('muncul');
        if (selesai == false) {
            munculkanTikus()
        }
    }, wRandom);
}
function mulai() {
    document.querySelector('.mulai').setAttribute('style', 'display:none')
    document.querySelector('#waktu').setAttribute('style', 'display:block')
    document.querySelector('#papanWaktu').setAttribute('style', 'display:block')
    var detik = 10000
    selesai = false
    scor = 0
    papanScor.textContent = 0
    waktu = 31
    batasWaktu()
    munculkanTikus()
    setTimeout(() => {
        document.querySelector('.mulai').setAttribute('style', 'display:block')
        document.querySelector('#waktu').setAttribute('style', 'display:none')
        document.querySelector('#papanWaktu').setAttribute('style', 'display:none')
        selesai = true
    }, 3 * detik);
}
function pukul(e) {
    if (e.target.classList.contains('ada')) {
        document.getElementById('efek').play()
        scor = scor + 1
        papanScor.textContent = scor
    }
}
function batasWaktu() {
    var interval = setInterval(function () {
        if (waktu == 0) {
            clearInterval(interval)

            pesanSelesai()
        } else {
            waktu--
            document.getElementById('waktu').textContent = waktu
        }
    }, 1000)
}
tanah.forEach(even => {
    even.addEventListener('click', function (e) {
        pukul(e)
    })
});