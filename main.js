$(document).ready(function () {

    $(".bt:eq(0)").click(function(){
      const tx = document.getElementsByTagName("textarea");
      let inputs =[]
      let noOfprefix = 0;
      for (let i = 0; i < tx.length; i++) {
        inputs.push(tx[i].value)
      }
      // console.log(inputs[1].split("\n"))
      let notAvailable = ["Not Available IE's \tNot Available Part numbers"]
      let Available = ["Available IE's \tAvailable Part numbers"]
      let rows = inputs[1].split("\n")
      let prefixArray = rows[1].split("\t").filter((p)=>p!="")
      prefixArray.map((item)=>{
        if(item) noOfprefix++;
      })
      // console.log(rows)
      // console.log(rows.length)
      rows[0] = "New\t"+rows[0]
      rows[1] = "\t"+rows[1]
      // console.log(rows, "rows")
      rows.map((item, index)=>{
        
        if(index>1){
          let isMatching = []
          let cellsArray = item.split("\t")
          // console.log(typeof cellsArray, cellsArray)
          // console.log(cellsArray[2])
          // if((cellsArray[2]!=="" && cellsArray[2]!=undefined) || (cellsArray[1]!=="" && cellsArray[1]!=undefined)){
            if((cellsArray[1]!=="" && cellsArray[1]!=undefined)){
            // let oldieno= cellsArray[1]
            let newieno= cellsArray[1]
            // Changed no from 2 to 1
            let partno= cellsArray[0]
            let prefixPresence = cellsArray.slice(2,cellsArray.length-1).filter((f)=>f!="")
            // console.log(prefixPresence)
            // number has been changed from 3 to 2 
            // console.log(cellsArray, oldieno, newieno, partno, prefixPresence)
            if (partno.includes(",")){
              partno=partno.split(",")
            }else{
              partno=[partno]
            }
            let ieno
            // console.log(newieno)
            newieno && newieno.split("/").map((item)=>{
              if(item.includes("i")){
                ieno = item
              }
            })
            // if(!ieno){
            //   oldieno.split("/").map((item)=>{
            //     if(item.includes("i")){
            //       ieno = item
            //     }
            //   })
            // }
            ieno = ieno.replace(/[^a-zA-Z0-9]+/g,'');
            if(ieno&&!inputs[0].includes(ieno)){
                // notAvailable.push(`${ieno} \t${(item.split("\t")[0])}`)
                //console.log("noieno", ieno)
                isMatching[0] = false
            }else if(ieno!=''&&ieno&&ieno.includes("i")){
              if(partno&&partno.length>0){
                partno.map((i_partno)=>{
                  if(i_partno&&!inputs[0].includes(i_partno)){
                    //console.log("nopartno", i)
                    isMatching[0] = false
                  }else{
                    let batchIEContent = inputs[0].split(ieno)[1].split("SMCS Code:").slice(1,2).join("")
                    let prefixCount = batchIEContent.split("S/N")
                  console.log(prefixCount.length)
                  //console.log(prefixPresence)
                  //console.log(prefixArray)
                    if(prefixCount[1]){
                      prefixPresence.map((i, in_)=>{
                          isMatching[in_] = false
                          if(!prefixArray[in_].includes(":"))prefixArray[in_]=": "+prefixArray[in_]
                          if(i==0 && !batchIEContent.includes(prefixArray[in_])){
                            isMatching[in_] = true
                            console.log('no prefix true', prefixArray[in_])
                          } else if(i==1 && !batchIEContent.includes(prefixArray[in_])){
                            isMatching[in_] = false
                            console.log('no prefix false', prefixArray[in_])
                          } else {
                            prefixCount.map((a_, a_index)=>{
                              if(a_index < prefixCount.length-1){
                                console.log(prefixCount[a_index+1].includes(prefixArray[in_]), a_index, i_partno, prefixArray[in_], a_.includes(i_partno), i==1, in_)
                                if(isMatching[in_]!= true && prefixCount[a_index+1].includes(prefixArray[in_]) && a_.includes(i_partno) && i==1){
                                  console.log("true")
                                  isMatching[in_] = true;
                                  return true;
                                } else if(isMatching[in_]!= true && prefixCount[a_index+1].includes(prefixArray[in_]) && !a_.includes(i_partno) && i==0){
                                  console.log("false")
                                  isMatching[in_] = true;
                                  return true;
                                } else if(isMatching[in_]!= true && prefixCount[a_index+1].includes(prefixArray[in_]) && !a_.includes(i_partno) && i==1){
                                  console.log("nottrue")
                                  isMatching[in_] = false;
                                  console.log("nottrue")
                                  return true;
                                } else if(isMatching[in_]!= true && prefixCount[a_index+1].includes(prefixArray[in_]) && a_.includes(i_partno) && i==0){
                                  console.log("notfalse")
                                  isMatching[in_] = false;
                                  return true;
                                } 
                              }
                            })
                          }
                      })
                    } else{
                      prefixPresence.map((i_, in_)=>{
                        console.log(i_, i_==1)
                        isMatching[in_] = i_==1?true:false
                      })
                    }
                  }
                })
              }
            
            }
  
            // console.log(JSON.stringify(rows[index]).split("\\t"))
            // rows[index] = JSON.stringify(rows[index]).split("\\t").filter(f=>f!="").join("\\t")
            // console.log(JSON.stringify(rows[index]))
            // rows[index] = JSON.parse(rows[index])
            console.log(isMatching)
            rows[index] = `${isMatching.includes(false)?"NO":"YES"}\t${rows[index]}`
          } else {
            if(cellsArray[0]!=""){
              rows[index] = `NO\t${rows[index]}`
              //console.log(rows[index])
            }
          }
        }
      })
      // console.log(notAvailable)
       navigator.clipboard.writeText(rows.join("\n"))
      //  console.log(rows)
      $(".modalopen a").click()
    })
    $(".bt:eq(1)").click(function(){
      $("textarea").val("");
    })
    $(".image:nth-child(1)").click(function () {
      $(".form").toggle()
      $(".bt").toggle()
      $(".help").toggle()
      $(".title").toggle()
    })
  });
  