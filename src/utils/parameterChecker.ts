const checkParam = (array: Array<string>) => {

for (let i of array) {
if(!i) return false ;
else return true ;
}

}

export = {checkParam} ;