/**
 * Created by Denis on 08.06.2017.
 */
export default class CustomDate extends Date {

  /**
   * метод преобразования номера дня в году в трехразрядное число ввиде строки
   * @param  {[integer]} number [число менее 999]
   * @return {[string]}        [трехзначное число ввиде строки порядкового номера дня в году]
   */
  numberDaysOfYearXXX(number) {
    if (number > 365) {
      return false;
    }
    if (number < 10) {
      return `00${number}`;
    } else if (number < 100) {
      return `0${number}`;
    }
    return number;
  }

  /**
   * Метод определения порядкового номера в году
   * @param  {date} date Дата формата yyyy-mm-dd
   * @return {integer}  Порядковый номер в году
   */
  convertDateToNumberDay(date) {
    const now = new Date(date);
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return `${now.getFullYear()}-${this.numberDaysOfYearXXX(day)}`;
  }

  /**
   * Метод преообразует дату формата yyyy-<number day in year> в yyyy-mm-dd
   * @param  {string} date дата формата yyyy-<number day in year>
   * @return {date} дата формата yyyy-mm-dd
   */
  convertNumberDayToDate(date) {
    const re = /(\d{4})(-)(\d{3})/;
    const line = re.exec(date);
    const beginyear = new Date(line[1]);
    const unixtime = beginyear.getTime() + (line[3] * 1000 * 60 * 60 * 24);
    const res = new Date(unixtime);

    const month = res.getMonth() + 1;
    const days = res.getDate();
    const year = res.getFullYear();
    return `${days < 10 ? `0${days}` : days}.${month < 10 ? `0${month}` : month}.${year}`;
  }

  /**
   * Метод преобразования даты вида yyyy-<number day in year>
   * @param  {date1} date дата в формате yyyy-mm-dd
   * @return {string}  дата ввиде строки формата yyyy-<number day in year>
   */
  formatDate(date1) {
    const date = new Date(date1);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${(month < 10) ? `0${month}` : month}-${(day < 10) ? `0${day}` : day}`;
  }

  /**
   * Метод возвращает текущую отформатированную дату yyyy-mm-dd
   * @return {[string]} текущая дата
   */
  getCurrentDate() {
    return this.formatDate(new Date());
  }

  // Возвращает последние три месяца
  getDateLastThreeMonth() {
    const now = new Date();
    let year = new Date().getFullYear();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);

    day -= 90;

    if (day < 0) {
      year -= 1;
      day = 365 - day;
    }

    return `${year}-${this.numberDaysOfYearXXX(day)}`;
  }

  /**
   * Возвращает интервал дат текущего лета
   * @returns {*[]}
   */
  getCurrentSummerDate() {
    const date = new Date();
    let year = date.getFullYear();
    if (date.getMonth() < 5) {
      year -= 1;
    }
    const dateFr = `${year}-06-01`;
    const dateTo = `${year}-08-31`;
    return [dateFr, dateTo];
  }

  // Возвращает интервал дат текущего лета
  getCurrentSpringDate() {
    const date = new Date();
    let year = date.getFullYear();
    if (date.getMonth() < 2) {
      year -= 1;
    }
    const dateFr = `${year}-03-01`;
    const dateTo = `${year}-05-31`;
    return [dateFr, dateTo];
  }

  // Возвращает интервал дат предыдущего лета
  getLastSummerDate() {
    const year = new Date().getFullYear() - 1;
    const dateFr = `${year}-06-01`;
    const dateTo = `${year}-08-31`;
    return [dateFr, dateTo];
  }
  /**
   * Вернуть Наименование месяца по его номеру
   * @param numMonth
   * @returns {*}
   */
  getMonthNameByMonthNumber(numMonth) {
    if ((typeof numMonth !== 'number') || (numMonth <= 0 && numMonth >= 12)) {
      return null;
    }
    const monthName = {
      0: 'Jan',
      1: 'Feb',
      2: 'Mar',
      3: 'Apr',
      4: 'May',
      5: 'Jun',
      6: 'Jul',
      7: 'Aug',
      8: 'Sep',
      9: 'Oct',
      10: 'Nov',
      11: 'Dec'
    };
    return monthName[numMonth];
  }
  getFirstDateCurYear() {
    return `${new Date().getFullYear()}-001`;
  }
  /**
   * [timestampToDate unixtime to hh:mm]
   * @param  {[type]} timestamp [description]
   * @return {string}           [description]
   */
  timestampToTime(unixtime) {
    const date = new Date(unixtime * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes} `;
  }
  /**
   * Возвращает полученныую дату равную текущей минус X дней
   */
  getDateBeforeDay(X = 0) {
    const date = new Date();
    const resDate = new Date(date.setDate(date.getDate() - X));
    return `${resDate.getFullYear()}-${resDate.getMonth() > 9 ? resDate.getMonth() + 1 : `0${resDate.getMonth() + 1}`}-${resDate.getDate() > 9 ? resDate.getDate() : `0${resDate.getDate()}`}`;
  }
  /** Вернуть наименование дня недели
   * @param dayNumber
   * @returns {string}
   */
  getDayNameOfWeekByDayNumber(dayNumber) {
    const days = {
      0: 'Sun',
      1: 'Mon',
      2: 'Tue',
      3: 'Wed',
      4: 'Thu',
      5: 'Fri',
      6: 'Sat'
    };
    return days[dayNumber];
  }
  /**
   * Возвращает дату в формате HH:MM MonthName NumberDate
   * @returns {string}
   */
  getTimeDateHHMMMonthDay() {
    const date = new Date();
    return `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} ${this.getMonthNameByMonthNumber(date.getMonth())} ${date.getDate()}`;
  }

  getDayOfWeekDateMonthDateYear(date) {
    return (
      new Date(date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate()).toDateString()
    );
  }

  /** Сравнение даты в формате dd.mm.yyyy = dd.mm.yyyy с текущим днем
   *
   */
  compareDatesWithToday(date) {
    return date.toLocaleDateString() === (new Date()).toLocaleDateString();
  }
  /**
   * Преобразование строкого представления даты к виду dd.mm.yyyy hh:mm
   * @param dateString
   * @returns {string}
   */
  getDateDDMMYYYYHHMM(dateString) {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1) < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth();
    const dateOfMonth = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const hours = date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours();
    const minutes = date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes();
    return `${dateOfMonth}.${month}.${year} ${hours}:${minutes}`;
  }
}
