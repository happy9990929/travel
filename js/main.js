let cityVal;
let areaVal;

//串接台灣行政區
fetch('../taiwan.json').then(function(response){
    return response.json();
}).then(function(result){
    let cities = document.getElementById('cities');
    let areas = document.getElementById('areas');
    let city = []; //所有城市 
    let areaDistricts; 
    let area = []; //所有地區
    //城市select
    result.forEach(item => {
        city.push(item.name);
    }); 
    city.forEach(ele =>{
        let option = document.createElement('option');
        option.innerText = ele;
        option.setAttribute('value',ele);
        cities.appendChild(option);
    })

    //地區select
    cities.addEventListener('change', (e) => {
        //移除地區陣列的所有物件
        //area.splice(0, areas.options.length);
        area = [];
        //移除select所有option
        areas.options.length = 1;
        //取得city的value
        cityVal = e.target.value;
        //取得選到的city的行政區
        result.forEach(item => {
            if(cityVal === item.name){
                areaDistricts = item.districts;
            }
        })
        areaDistricts.forEach(item =>{
            area.push(item.name);
        })
        area.forEach(ele =>{
            let option = document.createElement('option');
            option.innerText = ele;
            option.setAttribute('value',ele);
            areas.appendChild(option);
        })
    })

    areas.addEventListener('change', (e)=>{
        areaVal = e.target.value;
    })
}).catch(function(error){
    console.log(error);
})

//串接各地區活動
fetch('../activity.json').then(function (response) {
    return response.json();
}).then(function (result) {
    let infos = result.XML_Head.Infos.Info;
    let sites = document.getElementById('sites');
    let submit = document.getElementById('submit');
    let sitesContent;

    //submit
    submit.addEventListener('click', () => {
        sites.innerHTML = '';
        console.log(cityVal);
        console.log(areaVal);

        infos.forEach(item => {
            //如果沒有圖片
            if( item.Picture1 == null || item.Picture1 == ''){
                item.Picture1= './images/noImg.svg';
            }
            //符合選取的城市的活動
            if (cityVal === item.Region && areaVal === undefined || areaVal === '請選擇地區') {
                sitesContent = document.createElement('div');
                sitesContent.className = 'col-md-4';
                sitesContent.innerHTML = `<div class="card mb-4 shadow-sm">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12 picture mb-2" style="background-image: url(${item.Picture1});"></div>
                                <div class="col-md-12">
                                    <div>${item.Start}</div>
                                    <div>${item.Name}</div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                sites.appendChild(sitesContent);
            } 
             //符合選取的城市與地區的活動
            if (cityVal === item.Region && areaVal === item.Town) {
                sitesContent = document.createElement('div');
                sitesContent.className = 'col-md-4';
                sitesContent.innerHTML = `<div class="card mb-4 shadow-sm">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12 picture mb-2" style="background-image: url(${item.Picture1});"></div>
                            <div class="col-md-12">
                                <div>${item.Start}</div>
                                <div>${item.Name}</div>
                            </div>
                        </div>
                    </div>
                </div>`;
                sites.appendChild(sitesContent);
            }

        })
        //查無資料時
        if (sites.children.length < 1) {
            console.log(sites.children.length);
            sites.innerHTML = `<div class="col-md-12">
                <div class="card">
                    <div class="card-body">抱歉!此地區暫無活動</div>
                </div>
            </div>`;
        }
    })
    //搜尋
    let searchInput = document.getElementById('searchAct');
    searchInput.addEventListener('change', (e)=>{
        sites.innerHTML = '';
        searchVal = e.target.value;
        infos.forEach(item =>{
            if( item.Name.indexOf(searchVal) >= 0){
                sitesContent = document.createElement('div');
                sitesContent.className = 'col-md-4';
                sitesContent.innerHTML = `<div class="card mb-4 shadow-sm">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12 picture mb-2" style="background-image: url(${item.Picture1});"></div>
                            <div class="col-md-12">
                                <div>${item.Start}</div>
                                <div>${item.Name}</div>
                            </div>
                        </div>
                    </div>
                </div>`;
                sites.appendChild(sitesContent);
            } 
        })

        //查無資料時
        if (sites.children.length < 1) {
            console.log(sites.children.length);
            sites.innerHTML = `<div class="col-md-12">
                <div class="card">
                    <div class="card-body">抱歉!您輸入的${searchVal}，查無此資料</div>
                </div>
            </div>`;
        } else if(searchVal == ''){
            sites.innerHTML = '';
        }
        console.log(searchVal);
    })
}).catch(function (error) {
    console.log(error);
})

