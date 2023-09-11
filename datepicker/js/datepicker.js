DatePicker.prototype = Object.create(Ctrl.Create.prototype)
function DatePicker(options) {
    var elem, i, elemTbCalendar, elemMonth, elemYear, elemVal, arrMonth, textVal;
    var currentDate = new Date()
    var props = this.extend(options)
    var main = this;
    this.createDatePicker(props)

    if (props.selector == "class") {
        elem = document.getElementsByClassName(props.className)
        arrMonth = this.getMonth(props)

        for (i = 0; i < elem.length; i++) {
            elemVal = elem[i].getElementsByTagName("b")[0]
            textVal = elem[i].getElementsByTagName("input")[0]
            elemMonth = elem[i].getElementsByTagName("b")[1]
            elemYear = elem[i].getElementsByTagName("b")[2]

            elemTbCalendar = elem[i].getElementsByTagName("tbody")[0]
            elemMonth.innerText = arrMonth.words
            elemYear.innerText = this.getYear()
            this.createCalendar(elemTbCalendar)
            elemVal.innerText = this.currentFullDate(props)
            textVal.value = this.currentFullDate(props)
            elemVal.setAttribute("data-month", arrMonth.num)
            elemVal.setAttribute("data-date", this.getDate())
            elemVal.setAttribute("data-year", this.getYear())

            elem[i].addEventListener("click", function (e) {
                var month, input, valMonthYear, valElem, elemTblCalendar, tdTag, d, m, y, i;
                if (e.target.classList.contains("ctrl-dp-month-left")) {
                    valMonthYear = e.target.nextSibling
                    valElem = e.target.parentNode.parentNode.parentNode.parentNode.children[0].children[0]
                    elemTblCalendar = e.target.parentNode.parentNode.children[2].children[1]
                    input = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0]
                    d = parseInt(valElem.getAttribute("data-date"))
                    m = parseInt(valElem.getAttribute("data-month")) - 1
                    y = parseInt(valElem.getAttribute("data-year"))
                    m < 0 ? m = 11 : m = m
                    valElem.innerText = main.currentFullDate(props, d, m, y)
                    input.vallue = main.currentFullDate(props, d, m, y)
                    valElem.setAttribute("data-month", m)
                    month = main.getMonth(props,m)
                    valMonthYear.innerText = month.words
                    main.createCalendar(elemTblCalendar, d, m, y)
                } else if (e.target.classList.contains("ctrl-dp-month-right")) {
                    valMonthYear = e.target.previousSibling
                    valElem = e.target.parentNode.parentNode.parentNode.parentNode.children[0].children[0]
                    elemTblCalendar = e.target.parentNode.parentNode.children[2].children[1]
                    input = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0]
                    d = parseInt(valElem.getAttribute("data-date"))
                    m = parseInt(valElem.getAttribute("data-month")) + 1
                    y = parseInt(valElem.getAttribute("data-year"))
                    m > 11 ? m = 0 : m = m
                    valElem.innerText = main.currentFullDate(props, d, m, y)
                    input.vallue = main.currentFullDate(props, d, m, y)
                    valElem.setAttribute("data-month", m)
                    month = main.getMonth(props,m)
                    valMonthYear.innerText = month.words
                    main.createCalendar(elemTblCalendar, d, m, y)
                } else if (e.target.classList.contains("ctrl-dp-year-left")) {
                    valMonthYear = e.target.nextSibling
                    valElem = e.target.parentNode.parentNode.parentNode.parentNode.children[0].children[0]
                    elemTblCalendar = e.target.parentNode.parentNode.children[2].children[1]
                    input = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0]
                    d = parseInt(valElem.getAttribute("data-date"))
                    m = parseInt(valElem.getAttribute("data-month"))
                    y = parseInt(valElem.getAttribute("data-year")) - 1
                    valElem.innerText = main.currentFullDate(props, d, m, y)
                    input.vallue = main.currentFullDate(props, d, m, y)
                    valElem.setAttribute("data-year", y)
                    valMonthYear.innerText = main.getYear(y)
                    main.createCalendar(elemTblCalendar, d, m, y)
                } else if (e.target.classList.contains("ctrl-dp-year-right")) {
                    valMonthYear = e.target.previousSibling
                    valElem = e.target.parentNode.parentNode.parentNode.parentNode.children[0].children[0]
                    elemTblCalendar = e.target.parentNode.parentNode.children[2].children[1]
                    input = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0]
                    d = parseInt(valElem.getAttribute("data-date"))
                    m = parseInt(valElem.getAttribute("data-month"))
                    y = parseInt(valElem.getAttribute("data-year")) + 1
                    valElem.innerText = main.currentFullDate(props, d, m, y)
                    input.vallue = main.currentFullDate(props, d, m, y)
                    valElem.setAttribute("data-year", y)
                    valMonthYear.innerText = main.getYear(y)
                    main.createCalendar(elemTblCalendar, d, m, y)
                } else if (e.target.tagName == "TD") {
                    var cm, cy;
                    var oDate = new Date()
                    elemTblCalendar = e.target.parentNode.parentNode
                    valElem = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[0]
                    input = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0]
                    cm = parseInt(valElem.getAttribute("data-month"))
                    cy = parseInt(valElem.getAttribute("data-year"))
                    tdTag = elemTblCalendar.getElementsByTagName("td")

                    for (i = 0; i<tdTag.length; i++) {
                        if (e.target.innerText != "") {
                            // console.log(tdTag)
                            tdTag[i].classList.remove("activeDate")
                        }
                    }

                    if (e.target.innerText != "") {
                        if (e.target.innerText != oDate.getDate() || cm != oDate.getMonth() || cy != oDate.getFullYear()) {
                            e.target.classList.add("activeDate")
                        }
                    }

                    d = parseInt(e.target.innerText)
                    m = parseInt(valElem.getAttribute("data-month"))
                    y = parseInt(valElem.getAttribute("data-year"))

                    if (e.target.innerText != "") {
                        valElem.innerText = main.currentFullDate(props, d, m, y)
                        input.value = main.currentFullDate(props, d, m, y)
                        valElem.setAttribute("data-date", d)
                    }
                }
            })

            elem[i].addEventListener("mouseover", function (e) {
                if (e.target.tagName == "TD") {
                    if (e.target.innerText != "") {
                        e.target.classList.add("dateMouseOver")
                    }
                }
            })

            elem[i].addEventListener("mouseout", function (e) {
                if (e.target.tagName == "TD") {
                    if (e.target.innerText != "") {
                        e.target.classList.remove("dateMouseOver")
                    }
                }
            })
        }
    } else if (props.selector == "id") {
        elem = document.getElementById(props.id)
        arrMonth = this.getMonth(props)
        elemVal = elem.getElementsByTagName("b")[0]
        textVal = elem.getElementsByTagName("input")[0]
        elemMonth = elem.getElementsByTagName("b")[1]
        elemYear = elem.getElementsByTagName("b")[2]

        elemTbCalendar = elem.getElementsByTagName("tbody")[0]
        elemMonth.innerText = arrMonth.words
        elemYear.innerText = this.getYear()
        this.createCalendar(elemTbCalendar)
        elemVal.innerText = this.currentFullDate(props)
        textVal.value = this.currentFullDate(props)
        elemVal.setAttribute("data-month", arrMonth.num)
        elemVal.setAttribute("data-date", this.getDate())
        elemVal.setAttribute("data-year", this.getYear())

        elem.addEventListener("click", function (e) {
            var month, input, valMonthYear, valElem, elemTblCalendar, tdTag, d, m, y, i;
            if (e.target.classList.contains("ctrl-dp-month-left")) {
                valMonthYear = e.target.nextSibling
                valElem = e.target.parentNode.parentNode.parentNode.parentNode.children[0].children[0]
                elemTblCalendar = e.target.parentNode.parentNode.children[2].children[1]
                input = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0]
                d = parseInt(valElem.getAttribute("data-date"))
                m = parseInt(valElem.getAttribute("data-month")) - 1
                y = parseInt(valElem.getAttribute("data-year"))
                m < 0 ? m = 11 : m = m
                valElem.innerText = main.currentFullDate(props, d, m, y)
                input.vallue = main.currentFullDate(props, d, m, y)
                valElem.setAttribute("data-month", m)
                month = main.getMonth(props,m)
                valMonthYear.innerText = month.words
                main.createCalendar(elemTblCalendar, d, m, y)
            } else if (e.target.classList.contains("ctrl-dp-month-right")) {
                valMonthYear = e.target.previousSibling
                valElem = e.target.parentNode.parentNode.parentNode.parentNode.children[0].children[0]
                elemTblCalendar = e.target.parentNode.parentNode.children[2].children[1]
                input = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0]
                d = parseInt(valElem.getAttribute("data-date"))
                m = parseInt(valElem.getAttribute("data-month")) + 1
                y = parseInt(valElem.getAttribute("data-year"))
                m > 11 ? m = 0 : m = m
                valElem.innerText = main.currentFullDate(props, d, m, y)
                input.vallue = main.currentFullDate(props, d, m, y)
                valElem.setAttribute("data-month", m)
                month = main.getMonth(props,m)
                valMonthYear.innerText = month.words
                main.createCalendar(elemTblCalendar, d, m, y)
            } else if (e.target.classList.contains("ctrl-dp-year-left")) {
                valMonthYear = e.target.nextSibling
                valElem = e.target.parentNode.parentNode.parentNode.parentNode.children[0].children[0]
                elemTblCalendar = e.target.parentNode.parentNode.children[2].children[1]
                input = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0]
                d = parseInt(valElem.getAttribute("data-date"))
                m = parseInt(valElem.getAttribute("data-month"))
                y = parseInt(valElem.getAttribute("data-year")) - 1
                valElem.innerText = main.currentFullDate(props, d, m, y)
                input.vallue = main.currentFullDate(props, d, m, y)
                valElem.setAttribute("data-year", y)
                valMonthYear.innerText = main.getYear(y)
                main.createCalendar(elemTblCalendar, d, m, y)
            } else if (e.target.classList.contains("ctrl-dp-year-right")) {
                valMonthYear = e.target.previousSibling
                valElem = e.target.parentNode.parentNode.parentNode.parentNode.children[0].children[0]
                elemTblCalendar = e.target.parentNode.parentNode.children[2].children[1]
                input = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0]
                d = parseInt(valElem.getAttribute("data-date"))
                m = parseInt(valElem.getAttribute("data-month"))
                y = parseInt(valElem.getAttribute("data-year")) + 1
                valElem.innerText = main.currentFullDate(props, d, m, y)
                input.vallue = main.currentFullDate(props, d, m, y)
                valElem.setAttribute("data-year", y)
                valMonthYear.innerText = main.getYear(y)
                main.createCalendar(elemTblCalendar, d, m, y)
            } else if (e.target.tagName == "TD") {
                var cm, cy;
                var oDate = new Date()
                elemTblCalendar = e.target.parentNode.parentNode
                valElem = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[0]
                input = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0]
                cm = parseInt(valElem.getAttribute("data-month"))
                cy = parseInt(valElem.getAttribute("data-year"))
                tdTag = elemTblCalendar.getElementsByTagName("td")

                for (i = 0; i<tdTag.length; i++) {
                    if (e.target.innerText != "") {
                        // console.log(tdTag)
                        tdTag[i].classList.remove("activeDate")
                    }
                }

                if (e.target.innerText != "") {
                    if (e.target.innerText != oDate.getDate() || cm != oDate.getMonth() || cy != oDate.getFullYear()) {
                        e.target.classList.add("activeDate")
                    }
                }

                d = parseInt(e.target.innerText)
                m = parseInt(valElem.getAttribute("data-month"))
                y = parseInt(valElem.getAttribute("data-year"))

                if (e.target.innerText != "") {
                    valElem.innerText = main.currentFullDate(props, d, m, y)
                    input.value = main.currentFullDate(props, d, m, y)
                    valElem.setAttribute("data-date", d)
                }
            }
            elem.addEventListener("mouseover", function (e) {
                if (e.target.tagName == "TD") {
                    if (e.target.innerText != "") {
                        e.target.classList.add("dateMouseOver")
                    }
                }
            })

            elem.addEventListener("mouseout", function (e) {
                if (e.target.tagName == "TD") {
                    if (e.target.innerText != "") {
                        e.target.classList.remove("dateMouseOver")
                    }
                }
            })
        })
    }
}

DatePicker.prototype.property = {
    datepicker: {
        id: null,
        className: "ctrl-datepicker",
        boxClass: "ctrl-datepicker",
        date: null,
        month: null,
        year: null,
        selector: "class",
        format: "DD/MM/YYYY",
        days: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС",],
        months: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь",],
        lang: "en",
        ru: {
            days: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС",],
            months: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь",],
        },
        en: {
            days: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su",],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",],
        }
    }
}

DatePicker.prototype.createDatePicker = function (props) {
    var selector;
    if (props.selector == "id") {
        selector = document.getElementById(props.id)
    } else if (props.selector == "class") {
        selector = document.getElementsByClassName(props.className)
    }

    var inputText = document.createElement("input")
    var ulOne = document.createElement("ul")
    var ulTwo = ulOne.cloneNode(false);
    var liOne = document.createElement("li")
    var liTwo = liOne.cloneNode(false)
    var spanOne = document.createElement("span")
    var spanTwo = spanOne.cloneNode(false)
    var spanThree = spanOne.cloneNode(false)
    var bOne = document.createElement("b")
    var bTwo = bOne.cloneNode(false)
    var bThree = bOne.cloneNode(false)
    var iOne = document.createElement("i")
    var iTwo = iOne.cloneNode(false)
    var iThre = iOne.cloneNode(false)
    var iFour = iOne.cloneNode(false)
    var iFive = iOne.cloneNode(false)
    var table = document.createElement("table")
    var thead = document.createElement("thead")
    var tbody = document.createElement("tbody")
    var tr = document.createElement("tr")

    if ("inputId" in props) {
        inputText.setAttribute("id", props.inputId)
        if ("inputName" in props) {
            inputText.setAttribute("name", props.inputName + "0")
        }
    } else {
        if ("inputName" in props) {
            inputText.setAttribute("name", props.inputName + "0")
        }
    }

    inputText.setAttribute("type", "hidden");
    ulOne.setAttribute("class", "ctrl-ul-dp")
    bOne.setAttribute("class", "ctrl-dp-value")
    bOne.setAttribute("data-date", "-")
    bOne.setAttribute("data-month", "-")
    bOne.setAttribute("data-year", "-")
    bTwo.setAttribute("class", "ctrl-dp-select-month")
    bThree.setAttribute("class", "ctrl-dp-select-year")

    iOne.setAttribute("class", "bi bi-chevron-compact-down")
    iTwo.setAttribute("class", "bi bi-chevron-compact-left ctrl-dp-month-left")
    iThre.setAttribute("class", "bi bi-chevron-compact-right ctrl-dp-month-right")
    iFour.setAttribute("class", "bi bi-chevron-compact-left ctrl-dp-year-left")
    iFive.setAttribute("class", "bi bi-chevron-compact-right ctrl-dp-year-right")
    table.setAttribute("class", "ctrl-dp-table")
    tbody.setAttribute("class", "ctrl-dp-date-grid")

    ulOne.appendChild(liOne)
    liOne.appendChild(spanOne)
    spanOne.appendChild(bOne)
    spanOne.appendChild(iOne)
    liOne.appendChild(ulTwo)
    ulTwo.appendChild(liTwo)
    liTwo.appendChild(spanTwo)
    spanTwo.appendChild(iTwo)
    spanTwo.appendChild(bTwo)
    spanTwo.appendChild(iThre)
    liTwo.appendChild(spanThree)
    spanThree.appendChild(iFour)
    spanThree.appendChild(bThree)
    spanThree.appendChild(iFive)
    liTwo.appendChild(table)
    table.appendChild(thead)
    table.appendChild(tbody)
    thead.appendChild(tr)

    for (var i = 0; i < 7; i++) {
        var th = document.createElement("th")
        if (this.property.lang == "custom") {
            th.innerText = props.days[i]
        } else {
            th.innerText = props[props.lang].days[i]
        }
        tr.appendChild(th)
    }

    if (props.selector == "class") {
        for (var i = 0; i < selector.length; i++) {
            if ("inputId" in props) {
                inputText.setAttribute("id", props.inputId + i)
                if ("inputName" in props) {
                    inputText.setAttribute("name", props.inputName + i)
                }
            } else {
                if ("inputName" in props) {
                    inputText.setAttribute("name", props.inputName + i)
                }
            }
            var uls = ulOne.cloneNode(true)
            var inputs = inputText.cloneNode(true)
            selector[i].appendChild(inputs)
            selector[i].appendChild(uls)
            selector[i].classList.add(props.boxClass)
        }
    } else if (props.selector == "id") {
        if ("inputId" in props) {
            inputText.setAttribute("id", props.inputId)
            if ("inputName" in props) {
                inputText.setAttribute("name", props.inputName)
            }
        } else {
            if ("inputName" in props) {
                inputText.setAttribute("name", props.inputName)
            }
        }
        selector.appendChild(inputText)
        selector.appendChild(ulOne)
        selector.classList.add(props.boxClass)
    }
}

DatePicker.prototype.createCalendar = function (tbl, d, m, y) {
    var tmpDate = new Date()
    var cd = tmpDate.getDate()
    var cm = tmpDate.getMonth()
    var cy = tmpDate.getFullYear()
    var td, tr

    if (d !== undefined && m !== undefined && y !== undefined) {
        var oDate = new Date(y, m, d)
    } else {
        var oDate = new Date()
    }

    var currentMonth = oDate.getMonth()
    var currentYear = oDate.getFullYear()
    var oneDay = new Date(currentYear, currentMonth, 1)
    var oTemp = new Date(currentYear, currentMonth + 1, 0)
    var lastDay = oTemp.getDate()
    var t = oneDay.getDay() - 1
    var j = 0, a = 0;

    if (tbl.innerText != "") {
        var col = tbl.rows.length
        for (var i = 0; i < col; i++) {
            tbl.deleteRow(-1)
        }
    }

    while (oneDay.getMonth() == currentMonth) {
        var i = 0
        tr = tbl.insertRow(-1)
        if (t < 0) {
            t = 6
        }

        while (i < 7) {
            if (j == 0) {
                if (i < t || a > lastDay) {
                    tr.insertCell(-1)
                } else {
                    if (oneDay.getDate() == cd && currentMonth == cm && currentYear == cy) {
                        td = tr.insertCell(-1)
                        td.setAttribute("class", "cdate")
                        td.innerText = oneDay.getDate()
                    } else {
                        td = tr.insertCell(-1)
                        td.innerText = oneDay.getDate()
                    }
                    oneDay.setDate(oneDay.getDate() + 1)
                }
            } else {
                if (oneDay.getMonth() != currentMonth) {
                    tr.insertCell(-1)
                    oneDay.setDate(oneDay.getDate() + 1)
                } else {
                    if (oneDay.getDate() == cd && currentMonth == cm && currentYear == cy) {
                        td = tr.insertCell(-1)
                        td.setAttribute("class", "cdate")
                        td.innerText = oneDay.getDate()
                    } else {
                        td = tr.insertCell(-1)
                        td.innerText = oneDay.getDate()
                    }
                    oneDay.setDate(oneDay.getDate() + 1)
                }
            }
            a++;
            i++
        }
        j++
    }
}

DatePicker.prototype.currentFullDate = function (props, d, m, y) {
    var oDate = new Date()
    var date = oDate.getDate()
    var month = oDate.getMonth() + 1
    var year = oDate.getFullYear()
    var format = props.format
    var monthWords

    if (d !== undefined && m !== undefined && y !== undefined) {
        date = d
        month = m + 1
        year = y

        if (~props.format.indexOf("DD")) {
            if (d < 10) {
                date = "0" + date
                format = format.replace("DD", date)
            } else {
                format = format.replace("DD", date)
            }
        } else if (props.format.indexOf("DD") == -1) {
            if (~props.format.indexOf("D")) {
                format = format.replace("D", date)
            }
        }

        if (~props.format.indexOf("MMM")) {
            if (props.lang == "custom") {
                monthWords = props.months[month - 1]
            } else {
                monthWords = props[props.lang].months[month - 1]
            }

            if (monthWords[monthWords.length - 1] == "ь" || monthWords[monthWords.length - 1] == "й") {
                monthWords = monthWords.substring(0, monthWords.length - 1)
                monthWords += "я"
            } else if (monthWords[monthWords.length - 1] == "т") {
                monthWords += "а"
            }
            format = format.replace("MMM", monthWords)
        } else if (props.format.indexOf("MMM") == -1) {
            if (month < 10) {
                month = "0" + month
                format = format.replace("MM", month)
            } else {
                format = format.replace("MM", month)
            }
        } else if (props.format.indexOf("MM") == -1) {
            if (~props.format.indexOf("M")) {
                format = format.replace("M", month)
            }
        }
    } else {
        if (~props.format.indexOf("DD")) {
            if (d < 10) {
                date = "0" + date
                format = format.replace("DD", date)
            } else {
                format = format.replace("DD", date)
            }
        } else if (props.format.indexOf("DD") == -1) {
            if (~props.format.indexOf("D")) {
                format = format.replace("D", date)
            }
        }

        if (~props.format.indexOf("MMM")) {
            if (props.lang == "custom") {
                monthWords = props.months[month - 1]
            } else {
                monthWords = props[props.lang].months[month - 1]
            }

            if (monthWords[monthWords.length - 1] == "ь" || monthWords[monthWords.length - 1] == "й") {
                monthWords = monthWords.substring(0, monthWords.length - 1)
                monthWords += "я"
            } else if (monthWords[monthWords.length - 1] == "т") {
                monthWords += "а"
            }
            format = format.replace("MMM", monthWords)
        } else if (props.format.indexOf("MMM") == -1) {
            if (month < 10) {
                month = "0" + month
                format = format.replace("MM", month)
            } else {
                format = format.replace("MM", month)
            }
        } else if (props.format.indexOf("MM") == -1) {
            if (~props.format.indexOf("M")) {
                format = format.replace("M", month)
            }
        }
    }

    if (~props.format.indexOf("YYYY")) {
        format = format.replace("YYYY", year)
    } else if (props.format.indexOf("YYYY") == -1) {
        if (~props.format.indexOf("YY")) {
            var yearStr = String(year)
            var yearSec = yearStr.substring(2, 4)
            format = format.replace("YY", yearSec)
        }
    }

    return format
}

DatePicker.prototype.getDate = function (d) {
    var oDate = new Date()
    if (d !== undefined) {
        oDate.setDate(d)
    }
    return oDate.getDate()
}

DatePicker.prototype.getMonth = function (props, m) {
    var oDate = new Date()
    var month = { num: null, words: null }

    if (m !== undefined) {
        oDate.setMonth(m)
    }

    month.num = oDate.getMonth()

    if (props.lang == "custom") {
        month.words = props.months[month.num]
    } else {
        month.words = props[props.lang].months[month.num]
    }
    return month
}

DatePicker.prototype.getYear = function (y) {
    var oDate = new Date()
    if (y !== undefined) {
        oDate.setFullYear(y)
    }
    return oDate.getFullYear()
}