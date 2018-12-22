function addSelectBox()
{
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()+1
    const year = date.getFullYear()
    const now = year+'-'+month+'-'+day
    const min = year+'-'+month+'-01'
    document.getElementById('table').innerHTML = null
    var arr = ' <select id="selectFrom">\n' +
        '                    <option selected="selected">Отправление</option>\n' +
        '                    <option value="VKO">Внуково</option>\n' +
        '                    <option value="LED">Пулково</option>\n' +
        '                </select>\n' +
        '                <select id="selectTo">\n' +
        '                    <option selected="selected">Прибытие</option>\n' +
        '                    <option value="VKO">Внуково</option>\n' +
        '                    <option value="LED">Пулково</option>\n' +
        '                </select>\n' +
        '                <input type="date" id="calendar" name="calendar" value='+now+'\n' +
        '                       min='+min+' max='+now+'>\n' +
        '                <input name="Поиск" value="Поиск" type="button" onclick="search(event)"/>'
    document.getElementById('select').innerHTML = arr
    document.getElementById('select').style.display     = 'block'

}

function generateTableFromVKO()
{
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()+1
    const year = date.getFullYear()
    const now = year+'-'+month+'-'+day
    document.getElementById('select').style.display     = 'none'
    document.getElementById('table').innerHTML          = null
    const proxyurl = 'https://cors-anywhere.herokuapp.com/'
    const url = 'https://api.rasp.yandex.net/v3.0/search/?apikey=037f678d-e371-43e1-ab0f-6d6f51ee6936&format=json&to=LED&from=VKO&lang=ru_RU&page=1&date='+now+'&system=iata'
    fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.text())
        .then(contents =>
        {

            var tableArr=['<table><tr height="50px" class="top"><th width="10%">Рейс</th><th width="10%">Заголовок</th><th width="10%" >Откуда</th><th width="10%">Куда</th><th width="10%">Отправление</th><th width="10%">Прибытие</th><th width="10%">Статус</th></tr>']
            return new Promise(function (resolve) {
                var arr = JSON.parse(contents).segments
                var i = 0
                arr.forEach(function (element) {
                    var dateDeparture = element.departure
                    var timeDeparture = (dateDeparture.split('T')[1]).split('+')[0].split(':')[0]+':'+(dateDeparture.split('T')[1]).split('+')[0].split(':')[1]
                    dateDeparture = (dateDeparture.split('T')[0]).split('-')[2]+'.'+dateDeparture.split('T')[0].split('-')[1]+'.'+dateDeparture.split('T')[0].split('-')[0]+'\n'
                    var dateArrival = element.arrival
                    var timeArrival = (dateArrival.split('T')[1]).split('+')[0].split(':')[0]+':'+(dateArrival.split('T')[1]).split('+')[0].split(':')[1]
                    dateArrival = (dateArrival.split('T')[0]).split('-')[2]+'.'+dateArrival.split('T')[0].split('-')[1]+'.'+dateArrival.split('T')[0].split('-')[0]+'\n'
                    tableArr.push('<tr height="50px"><td><a href="#">' + element.thread.number + '</a></td><td><a href="#">' + element.thread.title + '</a></td><td><a href="#">' + element.from.title + '</a></td><td><a href="#">' + element.to.title + '</a></td><td><a href="#">' + dateDeparture+timeDeparture + '</a></td><td><a href="#">' + dateArrival+timeArrival + '</a></td><td><a href="#">' + returnDelay() + '</a></td></tr>')
                    i++
                    if (i === arr.length)
                    {
                        resolve(tableArr)
                    }
                })
            })
        }).then((tableArr)=>{
        tableArr.push('</table>')
        document.getElementById('table').innerHTML = tableArr.join('\n')
    })


}

function generateTableToVKO()
{
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()+1
    const year = date.getFullYear()
    const now = year+'-'+month+'-'+day
    document.getElementById('select').style.display     = 'none'
    document.getElementById('table').innerHTML          = null
    const proxyurl = 'https://cors-anywhere.herokuapp.com/'
    const url = 'https://api.rasp.yandex.net/v3.0/search/?apikey=037f678d-e371-43e1-ab0f-6d6f51ee6936&format=json&from=LED&to=VKO&lang=ru_RU&page=1&date='+now+'&system=iata' // site that doesnt send Access-Control-*
    fetch(proxyurl + url)
        .then(response => response.text())
        .then(contents =>
        {
            console.log(JSON.parse(contents).segments)
            var tableArr=['<table><tr height="50px" class="top"><th width="10%">Рейс</th><th width="10%">Заголовок</th><th width="10%" >Откуда</th><th width="10%">Куда</th><th width="10%">Отправление</th><th width="10%">Прибытие</th><th width="10%">Статус</th></tr>']
            return new Promise(function (resolve) {
                var arr = JSON.parse(contents).segments
                var i = 0
                arr.forEach(function (element) {
                    var dateDeparture = element.departure
                    var timeDeparture = (dateDeparture.split('T')[1]).split('+')[0].split(':')[0]+':'+(dateDeparture.split('T')[1]).split('+')[0].split(':')[1]
                    dateDeparture = (dateDeparture.split('T')[0]).split('-')[2]+'.'+dateDeparture.split('T')[0].split('-')[1]+'.'+dateDeparture.split('T')[0].split('-')[0]+'\n'
                    var dateArrival = element.arrival
                    var timeArrival = (dateArrival.split('T')[1]).split('+')[0].split(':')[0]+':'+(dateArrival.split('T')[1]).split('+')[0].split(':')[1]
                    dateArrival = (dateArrival.split('T')[0]).split('-')[2]+'.'+dateArrival.split('T')[0].split('-')[1]+'.'+dateArrival.split('T')[0].split('-')[0]+'\n'

                    tableArr.push('<tr height="50px"><td><a href="#">' + element.thread.number + '</a></td><td><a href="#">' + element.thread.title + '</a></td><td><a href="#">' + element.from.title + '</a></td><td><a href="#">' + element.to.title + '</a></td><td><a href="#">' + dateDeparture+timeDeparture + '</a></td><td><a href="#">' + dateArrival+timeArrival + '</a></td><td><a href="#">' + returnDelay() + '</a></td></tr>')
                    i++
                    if (i === arr.length)
                    {
                        resolve(tableArr)
                    }
                })
            })
        }).then((tableArr)=>{
        tableArr.push('</table>')
        document.getElementById('table').innerHTML = tableArr.join('\n')
    })


}

function search()
{
    document.getElementById('table').innerHTML = null
    var from = document.getElementById('selectFrom').value
    var to = document.getElementById('selectTo').value
    var date = document.getElementById('calendar').value
    const proxyurl = 'https://cors-anywhere.herokuapp.com/'
    const url = 'https://api.rasp.yandex.net/v3.0/search/?apikey=037f678d-e371-43e1-ab0f-6d6f51ee6936&format=json&from=' + from + '&to=' + to + '&lang=ru_RU&page=1&date=' + date + '&system=iata' // site that doesnt send Access-Control-*
    fetch(proxyurl + url)
        .then(response => response.text())
        .then(contents => {
            if (JSON.parse(contents).segments) {
                var tableArr = ['<table><tr min-height="50vh"><th width="10%">Рейс</th><th width="10%">Заголовок</th><th width="10%" >Откуда</th><th width="10%">Куда</th><th width="10%">Отправление</th><th width="10%">Прибытие</th><th width="10%">Статус рейса </th></tr>']
                var arr = JSON.parse(contents).segments
                var i = 0
                arr.forEach(function (element) {
                    var dateDeparture = element.departure
                    var timeDeparture = (dateDeparture.split('T')[1]).split('+')[0].split(':')[0]+':'+(dateDeparture.split('T')[1]).split('+')[0].split(':')[1]
                    dateDeparture = (dateDeparture.split('T')[0]).split('-')[2]+'.'+dateDeparture.split('T')[0].split('-')[1]+'.'+dateDeparture.split('T')[0].split('-')[0]+'\n'
                    var dateArrival = element.arrival
                    var timeArrival = (dateArrival.split('T')[1]).split('+')[0].split(':')[0]+':'+(dateArrival.split('T')[1]).split('+')[0].split(':')[1]
                    dateArrival = (dateArrival.split('T')[0]).split('-')[2]+'.'+dateArrival.split('T')[0].split('-')[1]+'.'+dateArrival.split('T')[0].split('-')[0]+'\n'
                    tableArr.push('<tr height="50px"><td><a href="#">' + element.thread.number + '</a></td><td><a href="#">' + element.thread.title + '</a></td><td><a href="#">' + element.from.title + '</a></td><td><a href="#">' + element.to.title + '</a></td><td><a href="#">' + dateDeparture+timeDeparture + '</a></td><td><a href="#">' + dateArrival+timeArrival + '</a></td><td><a href="#">' + returnDelay() + '</a></td></tr>')
                    i++
                    if (i === arr.length) {
                        tableArr.push('</table>')
                        document.getElementById('table').innerHTML = tableArr.join('\n')
                    }
                })
            }
            else {
                alert('По данному запросу результаты отсутствуют, попробуйте изменить параметры поиска')
            }
        })

}

function convertTable(e)
{
    if (e.keyCode == 13) {
        var i = 0
        var query       = document.getElementById('search').value
        var table       = document.querySelector('table')
        var rows        = table.querySelectorAll('tr')
        var tableArr    =  ['<table><tr height="50px" class="top"><th width="10%">Рейс</td><th width="10%">Заголовок</th><th width="10%" >Откуда</th><th width="10%">Куда</th><th width="10%">Отправление</td><th width="10%">Прибытие</th><th width="10%">Статус рейса</th></tr>']
        if (table && rows)
        {
            rows.forEach(function (element) {
                console.log(element, query)
                if (parseHeader(element)[0]) {

                    if (parseHeader(element)[0].toString().indexOf(query) !== -1 || parseHeader(element)[6].indexOf(query) !== -1) {
                        console.log(element)
                        tableArr.push('<tr height="50px"><td><a href="#">' + parseHeader(element)[0] + '</a></td><td><a href="#">' + parseHeader(element)[1] + '</a></td><td><a href="#">' + parseHeader(element)[2] + '</a></td><td><a href="#">' + parseHeader(element)[3] + '</a></td><td><a href="#">' + parseHeader(element)[4] + '</a></td><td><a href="#">' + parseHeader(element)[5] + '</a></td><td><a href="#">' + parseHeader(element)[6] + '</a></td></tr></div>')
                    }
                    else {
                        tableArr.push('<tr height="50px" style="display: none"><td><a href="#">' + parseHeader(element)[0] + '</a></td><td><a href="#">' + parseHeader(element)[1] + '</a></td><td><a href="#">' + parseHeader(element)[2] + '</a></td><td><a href="#">' + parseHeader(element)[3] + '</a></td><td><a href="#">' + parseHeader(element)[4] + '</a></td><td><a href="#">' + parseHeader(element)[5] + '</a></td><td><a href="#">' + parseHeader(element)[6] + '</a></td></tr></div>')
                    }
                }
                i++
                if (i === rows.length) {
                    tableArr.push('</table>')
                    document.getElementById('table').innerHTML = tableArr.join('\n')
                }
            })
        }

    }
}

function parseHeader(header)
{
    return [...header.querySelectorAll('td')].map((e) => e.textContent)
}

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min
}

function returnDelay()
{
    if (getRandomInt(1,12)>10)
    {
        return 'Задержан'
    }
    else
    {
        return 'По расписанию'
    }
}