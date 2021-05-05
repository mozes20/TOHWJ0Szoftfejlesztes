var fs = require('fs');
var etalon = JSON.parse(fs.readFileSync('./1/Panels_1.json', 'utf8'));
var obj2 = JSON.parse(fs.readFileSync('./1/Panels_6.json', 'utf8'));
var obj3 = JSON.parse(fs.readFileSync('./1/Panels_3.json', 'utf8'));




var dict=[]
for (let i = 0; i < etalon.Panels_1[2].ObjectClasses.length; i++) {
   var index= obj2.Panels_6[2].ObjectClasses.findIndex(x => x.Name === etalon.Panels_1[2].ObjectClasses[i].Name)
    if(index==-1){
        dict.push({"old":obj2.Panels_6[2].ObjectClasses[i],"new":etalon.Panels_1[2].ObjectClasses[i]})
    }else{
        dict.push({"old":obj2.Panels_6[2].ObjectClasses[index],"new":etalon.Panels_1[2].ObjectClasses[i]})
    }
}


for (let i = 0; i < 1; i++) {
    obj2.Panels_6[i].Images.forEach(element => {
        element.BoundingBoxes.forEach(element2 => {
            let index =dict.findIndex(x => x.old.Id === element2.ObjectIndex)
            element2.ObjectIndex=dict[index].new.Id
        });

    });
}

dict=[]

for (let i = 0; i < etalon.Panels_1[2].ObjectClasses.length; i++) {
    var index= obj3.Panels_3[2].ObjectClasses.findIndex(x => x.Name === etalon.Panels_1[2].ObjectClasses[i].Name)
     if(index==-1){
         dict.push({"old":obj3.Panels_3[2].ObjectClasses[i],"new":etalon.Panels_1[2].ObjectClasses[i]})
     }else{
         dict.push({"old":obj3.Panels_3[2].ObjectClasses[index],"new":etalon.Panels_1[2].ObjectClasses[i]})
     }
 }



 for (let i = 0; i < 1; i++) {
    obj3.Panels_3[i].Images.forEach(element => {
        if(element.BoundingBoxes!=null)
        {
            element.BoundingBoxes.forEach(element2 => {
                let index =dict.findIndex(x => x.old.Id === element2.ObjectIndex)
                element2.ObjectIndex=dict[index].new.Id
            });

        }
        
    });
}

obj2.Panels_6[3] = etalon.Panels_1[3]
obj3.Panels_3[3] = etalon.Panels_1[3]



fs.writeFile("./1/Panels_6.json", JSON.stringify(obj2), (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
    }
})

fs.writeFile("./1/Panels_3.json", JSON.stringify(obj3), (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
    }
})

