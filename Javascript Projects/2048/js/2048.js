// JavaScript Document

//判断某行或者某列是否需要继续下面操作
function CheckChang(bIsRowData, nOrder)
{
	var nSum = 0;
	var nTemp = 0;
	if (bIsRowData){
		for ( ; nTemp<4; nTemp++){
			nSum += arrayOrigData[nOrder][nTemp];
		}
	}else {
		for ( ; nTemp<4; nTemp++){
			nSum += arrayOrigData[nTemp][nOrder];
		}
	}
	return (nSum == 0) ? false:true; 
}  

//Up操作
function MoveUp()
{
	for (var nColumn=0; nColumn<4; nColumn++){
		var bIsChang = CheckChang(false, nColumn);
		if (bIsChang){
			for (var nRow=1; nRow<4; nRow++){
				var nFrontData = arrayOrigData[nRow-1][nColumn];
				var nCurData = arrayOrigData[nRow][nColumn];
				if (nFrontData == nCurData){
					if(nFrontData != 0){
						arrayOrigData[nRow-1][nColumn] += arrayOrigData[nRow][nColumn];
						arrayOrigData[nRow][nColumn] = 0;
						$("#data" + (nRow-1) + nColumn).text(arrayOrigData[nRow-1][nColumn]);
						$("#data" + nRow + nColumn).text("");
						bHasMove = true;
					}
				}else{
					if ((nFrontData == 0) && (nCurData !=0)){
						bHasMove = true;
						arrayOrigData[nRow-1][nColumn] = arrayOrigData[nRow][nColumn];
						arrayOrigData[nRow][nColumn] = 0;
						$("#data" + (nRow-1) + nColumn).text(arrayOrigData[nRow-1][nColumn]);
						$("#data" + nRow + nColumn).text("");
						for (var nTemp=nRow-1;nTemp>0; nTemp--){
							if (arrayOrigData[nTemp-1][nColumn] == 0){
								arrayOrigData[nTemp-1][nColumn] = arrayOrigData[nTemp][nColumn];
								arrayOrigData[nTemp][nColumn] = 0;
								$("#data" + (nTemp-1) + nColumn).text(arrayOrigData[nTemp-1][nColumn]);
								$("#data" + nTemp + nColumn).text("");
							}else{
								if (arrayOrigData[nTemp-1][nColumn] == nCurData){
									arrayOrigData[nTemp-1][nColumn] +=  arrayOrigData[nTemp][nColumn];
									arrayOrigData[nTemp][nColumn] = 0;
									$("#data" + (nTemp-1) + nColumn).text(arrayOrigData[nTemp-1][nColumn]);
									$("#data" + nTemp + nColumn).text("");
								}
								break;
							}
						}
					}
				}
			}
		}
	}
/*	var bIsGameOver = CheckGameOver();
	if(!bHasMove  && bIsGameOver){
		alert("游戏结束！");
	}*/
}

//Down操作
function MoveDown()
{
	for (var nColumn=0; nColumn<4; nColumn++){
		var bIsChang = CheckChang(false, nColumn);
		if (bIsChang){
			for (var nRow=2; nRow>=0; nRow--){
				var nFrontData = arrayOrigData[nRow+1][nColumn];
				var nCurData = arrayOrigData[nRow][nColumn];
				if (nFrontData == nCurData){
					if(nFrontData != 0){
						arrayOrigData[nRow+1][nColumn] += arrayOrigData[nRow][nColumn];
						arrayOrigData[nRow][nColumn] = 0;
						$("#data" + (nRow+1) + nColumn).text(arrayOrigData[nRow+1][nColumn]);
						$("#data" + nRow + nColumn).text("");
						bHasMove = true;
					}
				}else{
					if ((nFrontData == 0) && (nCurData !=0)){
						bHasMove = true;
						arrayOrigData[nRow+1][nColumn] = arrayOrigData[nRow][nColumn];
						arrayOrigData[nRow][nColumn] = 0;
						$("#data" + (nRow+1) + nColumn).text(arrayOrigData[nRow+1][nColumn]);
						$("#data" + nRow + nColumn).text("");
						for (var nTemp=nRow+1;nTemp<3; nTemp++){
							if (arrayOrigData[nTemp+1][nColumn] == 0){
								arrayOrigData[nTemp+1][nColumn] = arrayOrigData[nTemp][nColumn];
								arrayOrigData[nTemp][nColumn] = 0;
								$("#data" + (nTemp+1) + nColumn).text(arrayOrigData[nTemp+1][nColumn]);
								$("#data" + nTemp + nColumn).text("");
							}else{
								if (arrayOrigData[nTemp+1][nColumn] == nCurData){
									arrayOrigData[nTemp+1][nColumn] +=  arrayOrigData[nTemp][nColumn];
									arrayOrigData[nTemp][nColumn] = 0;
									$("#data" + (nTemp+1) + nColumn).text(arrayOrigData[nTemp+1][nColumn]);
									$("#data" + nTemp + nColumn).text("");
								}
								break;
							}
						}
					}
				}
			}
		}
	}
/*	var bIsGameOver = CheckGameOver();
	if(!bHasMove  && bIsGameOver){
		alert("游戏结束！");
	}*/
}

//Left操作
function MoveLeft()
{
	for (var nRow=0; nRow<4; nRow++){
		var bIsChang = CheckChang(true, nRow);
		if (bIsChang){
			for (var nColumn=1; nColumn<4; nColumn++){
				var nFrontData = arrayOrigData[nRow][nColumn-1];
				var nCurData = arrayOrigData[nRow][nColumn];
				if (nFrontData == nCurData){
					if(nFrontData != 0){
						bHasMove = true;
						arrayOrigData[nRow][nColumn-1] += arrayOrigData[nRow][nColumn];
						arrayOrigData[nRow][nColumn] = 0;
						$("#data" + nRow + (nColumn-1)).text(arrayOrigData[nRow][nColumn-1]);
						$("#data" + nRow + nColumn).text("");
					}
				}else{
					if ((nFrontData == 0) && (nCurData !=0)){
						bHasMove = true;
						arrayOrigData[nRow][nColumn-1] = arrayOrigData[nRow][nColumn];
						arrayOrigData[nRow][nColumn] = 0;
						$("#data" + nRow + (nColumn-1)).text(arrayOrigData[nRow][nColumn-1]);
						$("#data" + nRow + nColumn).text("");
						for (var nTemp=nColumn-1;nTemp>0; nTemp--){
							if (arrayOrigData[nRow][nTemp-1] == 0){
								arrayOrigData[nRow][nTemp-1] = arrayOrigData[nRow][nTemp];
								arrayOrigData[nRow][nTemp] = 0;
								$("#data" + nRow + (nTemp-1)).text(arrayOrigData[nRow][nTemp-1]);
								$("#data" + nRow + nTemp).text("");
							}else{
								if (arrayOrigData[nRow][nTemp-1] == nCurData){
									arrayOrigData[nRow][nTemp-1] +=  arrayOrigData[nRow][nTemp];
									arrayOrigData[nRow][nTemp] = 0;
									$("#data" + nRow + (nTemp-1)).text(arrayOrigData[nRow][nTemp-1]);
									$("#data" + nRow + nTemp).text("");
								}
								break;
							}
						}
					}
				}
			}
		}
	}
/*	var bIsGameOver = CheckGameOver();
	if(!bHasMove  && bIsGameOver){
		alert("游戏结束！");
	}*/
}

//Rigth操作
function MoveRigth()
{
	for (var nRow=0; nRow<4; nRow++){
		var bIsChang = CheckChang(true, nRow);
		if (bIsChang){
			for (var nColumn=2; nColumn>=0; nColumn--){
				var nFrontData = arrayOrigData[nRow][nColumn+1];
				var nCurData = arrayOrigData[nRow][nColumn];
				if (nFrontData == nCurData){
					if(nFrontData != 0){
						bHasMove = true;
						arrayOrigData[nRow][nColumn+1] += arrayOrigData[nRow][nColumn];
						arrayOrigData[nRow][nColumn] = 0;
						$("#data" + nRow + (nColumn+1)).text(arrayOrigData[nRow][nColumn+1]);
						$("#data" + nRow + nColumn).text("");
					}
				}else{
					if ((nFrontData == 0) && (nCurData !=0)){
						bHasMove = true;
						arrayOrigData[nRow][nColumn+1] = arrayOrigData[nRow][nColumn];
						arrayOrigData[nRow][nColumn] = 0;
						$("#data" + nRow + (nColumn+1)).text(arrayOrigData[nRow][nColumn+1]);
						$("#data" + nRow + nColumn).text("");
						for (var nTemp=nColumn+1;nTemp<3; nTemp++){
							if (arrayOrigData[nRow][nTemp+1] == 0){
								arrayOrigData[nRow][nTemp+1] = arrayOrigData[nRow][nTemp];
								arrayOrigData[nRow][nTemp] = 0;
								$("#data" + nRow + (nTemp+1)).text(arrayOrigData[nRow][nTemp+1]);
								$("#data" + nRow + nTemp).text("");
							}else{
								if (arrayOrigData[nRow][nTemp+1] == nCurData){
									arrayOrigData[nRow][nTemp+1] +=  arrayOrigData[nRow][nTemp];
									arrayOrigData[nRow][nTemp] = 0;
									$("#data" + nRow + (nTemp+1)).text(arrayOrigData[nRow][nTemp+1]);
									$("#data" + nRow + nTemp).text("");
								}
								break;
							}
						}
					}
				}
			}
		}
	}
	
/*	var bIsGameOver = CheckGameOver();
	if(!bHasMove  && bIsGameOver){
		alert("游戏结束！");
	}*/
}

//创建新数字
function CreatNum()
{
	var nRandNum = (Math.random() * 100) % 20;
	nRandNum = Math.floor(nRandNum);
	nRandNum = nRandNum>17 ? 4:2;

	var nRowTemp = (Math.random() * 10) % 4;
	nRowTemp = Math.floor(nRowTemp);
	var nColumnTemp = (Math.random() * 10) % 4;
	nColumnTemp = Math.floor(nColumnTemp);

	if (arrayOrigData[nRowTemp][nColumnTemp] == 0){
		arrayOrigData[nRowTemp][nColumnTemp] = nRandNum;
		$("#data" + nRowTemp + nColumnTemp).text(nRandNum);
	}else{
		 CreatNum();
	}
}

//判断游戏是否结束
function CheckGameOver()
{
	for(var nRow=0; nRow<4; nRow++){
		for(var nColumn=0; nColumn<4; nColumn++){
			if((nRow==3) && (nColumn == 3)){
				if(arrayOrigData[nRow][nColumn] == 0){
					return false;
				}
			}else if((nRow !=3 ) && (nColumn == 3)){
				if((arrayOrigData[nRow][nColumn] == 0) || 
				(arrayOrigData[nRow][nColumn] == arrayOrigData[nRow+1][nColumn])){
					return false;
				}
			}else if((nRow ==3 ) && (nColumn != 3)){
				if((arrayOrigData[nRow][nColumn] == 0) || 
					(arrayOrigData[nRow][nColumn] == arrayOrigData[nRow][nColumn+1])){
					return false;
				}
			}else {
				if((arrayOrigData[nRow][nColumn] == 0) || 
					(arrayOrigData[nRow][nColumn] == arrayOrigData[nRow][nColumn+1]) || 
					(arrayOrigData[nRow][nColumn] == arrayOrigData[nRow+1][nColumn])){
					return false;
				}
			}
		}
	}
	return true;
}
