class Draw {
    constructor(dom) {
        this.canvas = null
        this.ctx = null
        this.image = null
        this.sourceWidth = 60
        this.text = []
        this.pen = 4
        this.mode = 'pointSize'
        this.x = 1200 / 1600
        this.init(dom)
    }
    init(dom) {
        this.canvas = document.querySelector(dom)
        this.canvas.width = 1200 * this.sourceWidth / 60
        this.canvas.height = 1600
        this.ctx = this.canvas.getContext('2d')
        this.canvas2 = document.querySelector('#canvas2')
        this.canvas2.width = 300
        this.canvas2.height = 300
        this.ctx2 = this.canvas2.getContext('2d')
        this.ctx2.strokeStyle = '#323232'
        this.ctx2.lineWidth = 6
        this.ctx2.lineCap = 'round'
        this.ctx2.lineJoin = 'round'
        this.initEvent()
    }
    initEvent() {
        this.canvas2.addEventListener('mousemove', event => {
            if (this.drawing) {
                this.drawLine(event.offsetX, event.offsetY)
            }
        })
        this.canvas2.addEventListener('mousedown', event => {
            this.ctx2.moveTo(event.offsetX, event.offsetY)
            this.ctx2.beginPath()
            this.drawing = true
        })
        this.canvas2.addEventListener('mouseup', event => {
            this.drawing = false
            this.ctx2.closePath()
        })
        document.querySelector('#clear').addEventListener('click', () => {
            this.ctx2.clearRect(0, 0, 300, 300)
            this.ctx2.moveTo(0, 0)
        })
        document.querySelector('#add').addEventListener('click', () => {
            this.addToPainter()
        })
        document.querySelector('#file').addEventListener('change', () => {
            let file = document.querySelector('#file').files[0]
            this.setImage(file)
        })
        document.querySelector('#clearAll').addEventListener('click', () => {
            this.text = []
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx2.clearRect(0, 0, 300, 300)
        })
        document.querySelector('#calc').addEventListener('click', () => {
            let className = document.querySelector('.canvas').className
            className = className === 'canvas' ? 'canvas x2' : 'canvas'
            document.querySelector('.canvas').className = className
        })
        document.querySelector('#penInput').addEventListener('change', (e) => {
            document.querySelector('#pen').innerHTML = e.target.value
            this.pen = e.target.value
            this.ctx2.lineWidth = this.pen
        })
        document.querySelector('#sourceWidth').addEventListener('change', (e) => {
            document.querySelector('#source').innerHTML = e.target.value * 20
            this.sourceWidth = e.target.value
            this.canvas.height = this.canvas.width / this.x * this.sourceWidth / 60
            this.canvas.width = 1200 * this.sourceWidth / 60
            let file = document.querySelector('#file').files[0]
            if (file) {
                this.setImage(file)
            }
        })
        document.querySelector('#pointSize').addEventListener('change', (e) => {
            this.setMode()
        })
        document.querySelector('#hasColor').addEventListener('change', (e) => {
            this.setMode()
        })
        document.querySelector('#darkSide').addEventListener('change', (e) => {
            this.setMode()
        })
        document.querySelector('#pointSizeOpacity').addEventListener('change', (e) => {
            this.setMode()
        })
        document.querySelector('#back').addEventListener('click', () => {
            this.text.forEach((item, index) => {
                if (item.id === this.activeId) {
                    this.text.splice(index, 1)
                }
            })
            this.drawTextImage()
        })
        document.querySelector('#addOnly').addEventListener('click', () => {
            this.setImageOnly()
        })
    }
    drawLine(x, y) {
        this.ctx2.lineTo(x, y)
        this.ctx2.stroke()
    }
    addToPainter(addOnly) {
        let text = this.ctx2.getImageData(0, 0, this.canvas2.width, this.canvas2.height)
        if (!text.data.some(item => item !== 0)) {
            alert('请先在田字格中写个字')
            return null
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        let image = new Image()
        image.onload = () => {
            const id = new Date().getTime()
            this.activeId = id
            this.text.push({ image, text, id })
            this.ctx2.clearRect(0, 0, 300, 300)
            this.ctx2.moveTo(0, 0)
            if (!addOnly) {
                this.drawTextImage()
            }
        }
        image.src = this.canvas2.toDataURL('image/png')
    }
    drawTextImage() {
        if (!this.image) {
            alert('请先选择一张图片')
            return null
        }
        if (this.rotate) {
            this.log('当前渲染模式较慢，请等待...')
        }
        this.ctx.fillStyle = '#fff'
        this.ctx.globalAlpha = 1
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.tmp = []
        this.text.sort((a, b) => {
            let ac = 0
            for (let i = 0; i < a.text.data.length; i += 4) {
                ac += a.text.data[i]
            }
            let bc = 0
            for (let i = 0; i < b.text.data.length; i += 4) {
                bc += b.text.data[i]
            }
            return ac - bc
        })
        if (this.rotate) {
            this.log('正在努力计算中...')
        }
        for (let i = 0; i < this.image.data.length; i += 4) {
            let r = this.image.data[i + 0]
            let g = this.image.data[i + 1]
            let b = this.image.data[i + 2]
            let x = 255 - (r + g + b) / 3
            let index = Math.min(parseInt(x / 255 * this.text.length), this.text.length - 1)
            let text = this.text[index]
            this.tmp.push(index)
            setTimeout(() => {
                this.drawPoint(text, i, r, g, b)
            }, 0)
        }
    }
    drawPoint(text, index, r, g, b) {
        let x = 0
        let y = 0
        index += 1
        let scale = 60 / this.sourceWidth * 0.1
        x = index / 4 % this.canvas3.width / this.canvas3.width * this.canvas.width - text.image.width * scale / 2
        x = parseInt(x)
        y = Math.ceil(index / 4 / this.canvas3.width) / this.canvas3.height * this.canvas.height - text.image.height * scale / 2
        y = parseInt(y)
        scale = 0.2 / 1.5
        this.ctx.globalAlpha = 1
        let img = this.createImage(text, r, g, b)
        let num = parseFloat((index + 4) / this.image.data.length * 100).toFixed(2)
        num = Math.min(100, num)
        this.log('渲染:' + num + '%')
        document.querySelector('#barBg').style.width = num + '%'
        this.ctx.drawImage(img, 0, 0, img.width, img.height, x, y, img.width * scale, img.height * scale)
    }
    setMode() {
        if (document.querySelector('#pointSize').checked) {
            this.mode = 'pointSize'
        }
        if (document.querySelector('#pointSizeOpacity').checked) {
            this.mode = 'pointSizeOpacity'
        }
        if (document.querySelector('#hasColor').checked) {
            this.mode = 'color'
        }
        if (document.querySelector('#darkSide').checked) {
            this.mode = 'darkSide'
        }

        this.log('模式调整为：' + {
            pointSize: '点大小模式',
            pointSizeOpacity: '点大小+明度模式',
            color: '彩图模式',
            darkSide: '高反差模式'
        }[this.mode])
        this.drawTextImage()
    }
    createImage(imageData, r, g, b) {
        if (!this.hideCanvas) {
            this.hideCanvas = document.createElement('canvas')
            this.hideCanvas.width = 300
            this.hideCanvas.height = 300
            this.hideCanvasCtx = this.hideCanvas.getContext('2d')
        }
        if (!this.hideCanvas2) {
            this.hideCanvas2 = document.createElement('canvas')
            this.hideCanvas2.width = 300
            this.hideCanvas2.height = 300
            this.hideCanvasCtx2 = this.hideCanvas2.getContext('2d')
        }
        this.hideCanvasCtx.clearRect(0, 0, 300, 300)
        this.hideCanvasCtx2.clearRect(0, 0, 300, 300)
        let image = null
        if (this.mode === 'color') {
            const index = Math.floor(Math.random() * this.text.length)
            imageData = this.text[index]
            this.hideCanvasCtx.putImageData(imageData.text, 0, 0)
            image = this.hideCanvasCtx.getImageData(0, 0, this.hideCanvas.width, this.hideCanvas.height)
            for (let i = 0; i < image.data.length; i += 4) {
                image.data[i] = r
                image.data[i + 1] = g
                image.data[i + 2] = b
            }
        }
        if (this.mode === 'darkSide') {
            const index = Math.floor(Math.random() * this.text.length)
            imageData = this.text[index]
            this.hideCanvasCtx.putImageData(imageData.text, 0, 0)
            image = this.hideCanvasCtx.getImageData(0, 0, this.hideCanvas.width, this.hideCanvas.height)
            for (let i = 0; i < image.data.length; i += 4) {
                let x = (r + g + b) / 3
                if (x > 255 / 2) {
                    x = Math.min(255, x * 1.5)
                } else {
                    x = x * 0.5
                }
                image.data[i] = x
                image.data[i + 1] = x
                image.data[i + 2] = x
            }
        }
        if (this.mode === 'pointSize' || this.mode === 'pointSizeOpacity') {
            this.hideCanvasCtx.putImageData(imageData.text, 0, 0)
            image = this.hideCanvasCtx.getImageData(0, 0, this.hideCanvas.width, this.hideCanvas.height)
            for (let i = 0; i < image.data.length; i += 4) {
                let x = (r + g + b) / 3
                if (this.mode === 'pointSize') {
                    x = 0
                }
                image.data[i] = x
                image.data[i + 1] = x
                image.data[i + 2] = x
            }
        }
        this.hideCanvasCtx.putImageData(image, 0, 0)
        this.hideCanvasCtx2.save()
        this.hideCanvasCtx2.clearRect(0, 0, 300, 300)
        this.hideCanvasCtx2.translate(this.canvas2.width / 2, this.canvas2.height / 2)
        const N = Math.random() > 0.4 ? 1 : -1
        this.hideCanvasCtx2.rotate(Math.PI / 180 * Math.random() * N * 90)
        this.hideCanvasCtx2.translate(-this.canvas2.width / 2, -this.canvas2.height / 2)
        this.hideCanvasCtx2.drawImage(this.hideCanvas, 0, 0)
        this.hideCanvasCtx2.restore()
        return this.hideCanvas2
    }
    setImageOnly() {
        const addOnly = true
        this.addToPainter(addOnly)
    }
    setImage(file) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            let image = new Image()
            image.src = e.target.result
            image.onload = () => {
                let canvas = document.querySelector('#canvas3')
                let width = this.sourceWidth
                let height = this.sourceWidth / image.width * image.height
                this.x = width / height
                canvas.width = width
                canvas.height = height
                this.canvas.height = this.canvas.width / this.x
                this.canvas.width = 1200 * this.sourceWidth / 60
                let ctx = canvas.getContext('2d')
                ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height)
                let imageData = ctx.getImageData(0, 0, width, height)
                ctx.putImageData(imageData, 0, 0)
                this.canvas3 = canvas
                this.image = imageData
            }
        }
    }
    log(log) {
        console.log(log)
        document.querySelector('#log').innerHTML = log
    }
}
let draw = new Draw('#canvas')