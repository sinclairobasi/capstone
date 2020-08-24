function getSavedItems(){
    const content = localStorage.getItem("saved");
    const retrieved = JSON.parse(content);
    return retrieved ? retrieved : [];
}

function saveItems(item){

    const content = localStorage.getItem("saved");
    let retrieved = JSON.parse(content);
    if(!retrieved){
        retrieved = []
    }
    retrieved.push(item);
    localStorage.setItem("saved", JSON.stringify(retrieved));
    return true;
}


// recreates the html state from the last operation
function restoreState(){

    let html = $(".fa-bookmark-o");


    let retrivedItem = getSavedItems();
   

    for(let i = 0; i < html.length; i++){
        let icon = html[i];
        let parent = icon.parentNode.parentNode.children;
        
        let data = {};
        data["heading"] = parent[0].innerText;
        data["type"] = parent[1].innerText;
        data["image"] = parent[2].getAttribute('src');

        let filteredItem = retrivedItem.filter(item => {
            return item.heading == data.heading;
        })

        let existing = retrivedItem.filter(item => {
            return item.heading != data.heading;
        })

        if(filteredItem.length > 0){
            $(icon).removeClass("fa-bookmark-o")
            $(icon).addClass("fa-bookmark")
        }

    }

}

$(document).ready(function(){

    restoreState();
    
})

$(".fa-bookmark-o").click(function(e){
    let icon = $(this)[0];
    let parent = icon.parentNode.parentNode.children;
    let data = {};
    data["heading"] = parent[0].innerText;
    data["type"] = parent[1].innerText;
    data["image"] = parent[2].getAttribute('src');
    let retrivedItem = getSavedItems();
    let filteredItem = retrivedItem.filter(item => {
        return item.heading == data.heading;
    })
    let existing = retrivedItem.filter(item => {
        return item.heading != data.heading;
    })

    if(filteredItem.length > 0){
        $(this).removeClass("fa-bookmark")
        $(this).fadeOut(500).fadeIn(500);
        $(this).addClass("fa-bookmark-o")
       
        
        localStorage.setItem("saved", JSON.stringify(existing))
    }else{
        saveItems(data);
        alert(`There are ${retrivedItem.length + 1} saved items now`)
        $(this).removeClass("fa-bookmark-o")
        $(this).fadeOut(500).fadeIn(500);
        $(this).addClass("fa-bookmark")
        
    }
    
});


function renderSavedItems(){
    const retrievedItem = getSavedItems();
    let builder = "";

    for(let i = 0; i < retrievedItem.length; i++){
    let item = retrievedItem[i];

    builder += `
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <h2 class="text-center">${item.heading}</h2>
            <p class="text-center">
            <span class="label label-info">${item.type}</span>
            </p>
            <img
            class="img img-responsive"
            style="width: 400px; height: 250px;"
            src="${item.image}"
            />
          
            <div>
            <i class="fa fa-heart-o"> like</i>
            </div>
            <div>
            <i class="fa fa-bookmark-o"> save for later</i>
            </div>
            
            
        </div>`;
    }
    console.log(builder, $("#saveforlater"));
    $("#saveforlater")[0].innerHTML = builder;

}

renderSavedItems();