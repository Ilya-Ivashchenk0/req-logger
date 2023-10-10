// Функция `splitData` разбивает строку данных `dataString` на подстроки длиной не более `maxLength`.
function splitData(dataString, maxLength) {
  const result = [] // Здесь будем хранить подстроки
  const lines = dataString.split('\n') // Разбиваем строку на строки

  lines.forEach((line) => { // Перебираем строки
    let data = line

    while (data.length) { // Пока есть данные в строке
      const chunk = data.substring(0, maxLength) // Берем часть строки длиной не более `maxLength`
      result.push(chunk) // Добавляем эту часть в результат
      data = data.substring(maxLength) // Удаляем обработанную часть из строки
    }
  })

  return result // Возвращаем массив подстрок
}

// Экспортируем middleware-функцию, которая будет обрабатывать запросы.
module.exports = (req, res, next) => {
  // Объявление цветов для консоли
  const {
    blue, green, yellow, red, reset, white
  } = {
    reset: '\x1b[0m',
    blue: '\x1b[34m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    white: '\x1b[37m'
  }

  const lineLength = 100 // Длина линии для отображения

  // Вывод верхней горизонтальной линии
  console.log(`${blue}╭${'─'.repeat(lineLength)}╮${reset}`)

  // Формирование информации о запросе и времени
  const queryLog = `Запрос: ${req.method}`
  const timeLog = `Время: ${new Date().toLocaleString()}`

  // Вычисление максимальной длины строк запроса и времени
  const maxLengthQuery = 'Запрос: DELETE'.length
  const maxLengthTime = 'Время: 06.10.2023, 05:49:28'.length

  // Вычисление количества пробелов между строками и слева от запроса
  const spaceBetweenLogs = lineLength - maxLengthQuery - maxLengthTime
  const spacesBeforeQuery = Math.floor((maxLengthQuery - queryLog.length) / 2)
  const spacesAfterQuery = maxLengthQuery - spacesBeforeQuery - queryLog.length
  const spacesBeforeTime = Math.floor((maxLengthTime - timeLog.length) / 2)

  // Вывод строки с информацией о запросе и времени
  console.log(`${blue}│${reset}${' '.repeat(spacesBeforeQuery)}${yellow}${queryLog}${reset}${' '.repeat(spacesAfterQuery + spaceBetweenLogs)}${green}${timeLog}${reset}${blue}│`)

  // Вывод горизонтальной линии
  console.log(`${blue}│${'─'.repeat(lineLength)}│${reset}`)

  // Функция `formatBody` форматирует данные запроса в виде JSON.
  const formatBody = (body) => {
    const formattedData = JSON.stringify(body, null, 2)
    return formattedData.split('\n').slice(1, -1).map((line) => `  ${line}`).join('\n')
  }

  // Формирование информации о данных запроса
  const dataLog = req.body && Object.keys(req.body).length
    ? `${red}Data: {\n${formatBody(req.body)}\n}${reset}`
    : `${white}Data none${reset}`

  const maxDataLength = lineLength
  const dataLines = splitData(dataLog, maxDataLength) // Разбиваем информацию о данных на строки

  // Вывод информации о данных
  dataLines.forEach((line) => {
    console.log(`  ${line.padEnd(lineLength)}`)
  })

  // Вывод нижней горизонтальной линии
  console.log(`${blue}╰${'─'.repeat(lineLength)}╯${reset}`)

  next() // Вызываем следующий middleware
}
