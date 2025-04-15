// 跨境电商主要国家及其时区信息
const countries = [
    {
        name: "美国",
        timezone: "America/New_York",
        flag: "usa.png",
        utcOffset: "-05:00/-04:00",
        description: "东部时间 (ET)",
        priority: true,
        cssClass: "usa"
    },
    {
        name: "美国",
        timezone: "America/Los_Angeles",
        flag: "usa.png",
        utcOffset: "-08:00/-07:00",
        description: "太平洋时间 (PT)",
        priority: true,
        cssClass: "usa"
    },
    {
        name: "墨西哥",
        timezone: "America/Mexico_City",
        flag: "mexico.png",
        utcOffset: "-06:00/-05:00",
        description: "中部时间 (CT)",
        priority: true,
        cssClass: "mexico"
    },
    {
        name: "中国",
        timezone: "Asia/Shanghai",
        flag: "china.png",
        utcOffset: "+08:00",
        description: "中国标准时间 (CST)"
    },
    {
        name: "英国",
        timezone: "Europe/London",
        flag: "uk.png",
        utcOffset: "+00:00/+01:00",
        description: "格林威治标准时间 (GMT)/英国夏令时 (BST)"
    },
    {
        name: "德国",
        timezone: "Europe/Berlin",
        flag: "germany.png",
        utcOffset: "+01:00/+02:00",
        description: "中欧时间 (CET)/中欧夏令时 (CEST)"
    },
    {
        name: "法国",
        timezone: "Europe/Paris",
        flag: "france.png",
        utcOffset: "+01:00/+02:00",
        description: "中欧时间 (CET)/中欧夏令时 (CEST)"
    },
    {
        name: "日本",
        timezone: "Asia/Tokyo",
        flag: "japan.png",
        utcOffset: "+09:00",
        description: "日本标准时间 (JST)"
    },
    {
        name: "澳大利亚",
        timezone: "Australia/Sydney",
        flag: "australia.png",
        utcOffset: "+10:00/+11:00",
        description: "澳大利亚东部标准时间 (AEST)/澳大利亚东部夏令时 (AEDT)"
    },
    {
        name: "加拿大",
        timezone: "America/Toronto",
        flag: "canada.png",
        utcOffset: "-05:00/-04:00",
        description: "东部时间 (ET)"
    },
    {
        name: "意大利",
        timezone: "Europe/Rome",
        flag: "italy.png",
        utcOffset: "+01:00/+02:00",
        description: "中欧时间 (CET)/中欧夏令时 (CEST)"
    },
    {
        name: "西班牙",
        timezone: "Europe/Madrid",
        flag: "spain.png",
        utcOffset: "+01:00/+02:00",
        description: "中欧时间 (CET)/中欧夏令时 (CEST)"
    },
    {
        name: "巴西",
        timezone: "America/Sao_Paulo",
        flag: "brazil.png",
        utcOffset: "-03:00/-02:00",
        description: "巴西利亚时间 (BRT)"
    }
];

// 初始化页面
function initializeTimezones() {
    const timezoneContainer = document.querySelector('.timezone-container');

    countries.forEach(country => {
        const card = createTimezoneCard(country);
        timezoneContainer.appendChild(card);
    });

    // 立即更新一次时间
    updateAllTimes();

    // 每秒更新一次时间
    setInterval(updateAllTimes, 1000);
}

// 创建时区卡片
function createTimezoneCard(country) {
    const card = document.createElement('div');
    let className = 'timezone-card';

    // 添加优先国家的类
    if (country.priority) {
        className += ' priority-country';
    }

    // 添加特定国家的类
    if (country.cssClass) {
        className += ' ' + country.cssClass;
    }

    card.className = className;
    card.setAttribute('data-timezone', country.timezone);

    // 使用图片标签替代表情符号
    const flagImg = `<img src="images/${country.flag}" alt="${country.name}国旗" class="flag">`;

    card.innerHTML = `
        <h2 class="country-name">${flagImg}${country.name}</h2>
        <p class="timezone-info">${country.description} (UTC${country.utcOffset})</p>
        <div class="current-time"></div>
        <div class="date"></div>
    `;

    return card;
}

// 更新所有时区的时间
function updateAllTimes() {
    const cards = document.querySelectorAll('.timezone-card');

    cards.forEach(card => {
        const timezone = card.getAttribute('data-timezone');
        updateTime(card, timezone);
    });
}

// 更新特定卡片的时间
function updateTime(card, timezone) {
    const options = {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    const dateOptions = {
        timeZone: timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const now = new Date();

    const timeString = now.toLocaleTimeString('zh-CN', options);
    const dateString = now.toLocaleDateString('zh-CN', dateOptions);

    card.querySelector('.current-time').textContent = timeString;
    card.querySelector('.date').textContent = dateString;
}

// 搜索功能
function setupSearch() {
    const searchInput = document.getElementById('country-search');
    const resetButton = document.getElementById('reset-search');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const cards = document.querySelectorAll('.timezone-card');

        cards.forEach(card => {
            const countryName = card.querySelector('.country-name').textContent.toLowerCase();
            const timezoneName = card.querySelector('.timezone-info').textContent.toLowerCase();

            if (countryName.includes(searchTerm) || timezoneName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    resetButton.addEventListener('click', function() {
        searchInput.value = '';
        const cards = document.querySelectorAll('.timezone-card');
        cards.forEach(card => {
            card.style.display = 'block';
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeTimezones();
    setupSearch();
});
