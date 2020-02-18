// initialize the 2D array with an array in each element
var overworld = [
    [[], []],
    [[], []]
];

overworld[0][0] = [];
overworld[0][0].push("ggggggggggggggggggggggggggggggggggggggg+++++++++");
overworld[0][0].push("g--------------------------------------+++++++++");
overworld[0][0].push("g--------------------------------------C++++++++");
overworld[0][0].push("g--------------***-----------------------------g");
overworld[0][0].push("g----------------------------------------------g");
overworld[0][0].push("g----------------------------------------------g");
overworld[0][0].push("g----**----------------------------------------g");
overworld[0][0].push("g---------------------o------------------------g");
overworld[0][0].push("g----------------------------------------------g");
overworld[0][0].push("g----------------------------------------------g");
overworld[0][0].push("g------------------------------------o---------g");
overworld[0][0].push("g----------------------------------------------g");
overworld[0][0].push("g----------------------------------------------g");
overworld[0][0].push("g----------------------------------------------g");
overworld[0][0].push("g----------------------------------------------g");
overworld[0][0].push("g---------o------------------------------------g");
overworld[0][0].push("g----------------------------------------------g");
overworld[0][0].push("g----------------------------------------------g");
overworld[0][0].push("g--------------------------------------**------g");
overworld[0][0].push("g----------------------------------------------g");
overworld[0][0].push("g-------***------------------------------------g");
overworld[0][0].push("g----------------------------------------------g");
overworld[0][0].push("g----------------------------------o-----------g");
overworld[0][0].push("g----------------------------------------------g");
overworld[0][0].push("g----------------------------------------------g");
overworld[0][0].push("g----------------------------------------------g");
overworld[0][0].push("gggggggggggggggggggggggggggggggggggggggggggggggg");

var cave = [
    [[], []],
    [[], []]
];

cave[0][0] = [];
cave[0][0].push("++++++++++++++++++++++++++++++++++++++++++++++++");
cave[0][0].push("+-----------------------------------------------");
cave[0][0].push("+-----------------------------------------------");
cave[0][0].push("+-----------------------------------------------");
cave[0][0].push("+------------o----------------------------------");
cave[0][0].push("+-----------------------------o-----------------");
cave[0][0].push("+-----------------------------------------------");
cave[0][0].push("+-----------------------------------------------");
cave[0][0].push("+-----------------------------------------------");
cave[0][0].push("+--------^--------------------------------------");
cave[0][0].push("+--------x----------------o-------o-------------");
cave[0][0].push("+-----------------------------------------------");
cave[0][0].push("+-----------------------------------------------");
cave[0][0].push("+-----------------------------------------------");
cave[0][0].push("+---------------------------------S-------------");
cave[0][0].push("+-----------------------------------------------");
cave[0][0].push("+-----------------------------------------------");
cave[0][0].push("+-----------------------------------------------");
cave[0][0].push("+-----------------------------------------------");
cave[0][0].push("+---------o-------------------------------------");
cave[0][0].push("+-----------------------------------------------");
cave[0][0].push("+---------------------------------^-------------");
cave[0][0].push("+---------------------------------x-------------");
cave[0][0].push("+-----------------------------------------------");
cave[0][0].push("+-----------------------------------------------");
cave[0][0].push("+------S----------------------------------------");
cave[0][0].push("+----------------------o-o----------------------");

cave[1][0] = [];
cave[1][0].push("++++++++++++++++++++++++++++++++++++++++++++++++");
cave[1][0].push("-----------------------------------------------+");
cave[1][0].push("------------------------o--------------B-------+");
cave[1][0].push("-------o---------------------------------------+");
cave[1][0].push("---------------------B-------------------------+");
cave[1][0].push("--------------------------------------o--------+");
cave[1][0].push("------------o----------------------------------+");
cave[1][0].push("-------------------------------------------B---+");
cave[1][0].push("-----------------------------------------------+");
cave[1][0].push("----------------o------------------------------+");
cave[1][0].push("--------------------------o---------------o----+");
cave[1][0].push("-----------------------------------------------+");
cave[1][0].push("-----------------------------------------------+");
cave[1][0].push("-----------------------------------------------+");
cave[1][0].push("-------------o---------------------------------+");
cave[1][0].push("-----------------------------------------------+");
cave[1][0].push("----------------------------o------------------+");
cave[1][0].push("-----------------o-----------------------------+");
cave[1][0].push("-----------------------------------------------+");
cave[1][0].push("----------o------------------------------------+");
cave[1][0].push("--------------o--------------------------------+");
cave[1][0].push("----------------------B------------------------+");
cave[1][0].push("-----------------------------------------------+");
cave[1][0].push("-----------------------------------------------+");
cave[1][0].push("----------o------------------o-----------------+");
cave[1][0].push("-----------------------------------------------+");
cave[1][0].push("-----------------------------------------------+");

cave[0][1]= [];
cave[0][1].push("+-----------------------------------------------");
cave[0][1].push("+-----------------------------------------------");
cave[0][1].push("+-----------------------------------------------");
cave[0][1].push("+-----------------------------------------------");
cave[0][1].push("+-----------------------------------------------");
cave[0][1].push("+-------------------------------o---------------");
cave[0][1].push("+-----------------------------------------------");
cave[0][1].push("+-----------------------------------------------");
cave[0][1].push("+-----------------------------------------------");
cave[0][1].push("+-----------------------------------------------");
cave[0][1].push("+----------^------------------------------------");
cave[0][1].push("+----------x------------------------------------");
cave[0][1].push("+-----------------------S-----------------------");
cave[0][1].push("+----------------------------------------S------");
cave[0][1].push("+-----------------------------------------------");
cave[0][1].push("+-----------------------------------------------");
cave[0][1].push("+-----------------------------------------------");
cave[0][1].push("+--------S--------------------------------------");
cave[0][1].push("+-----------------------------------------------");
cave[0][1].push("+-----------------------------------------------");
cave[0][1].push("+----------------------------------^------------");
cave[0][1].push("+----------------------------------x------------");
cave[0][1].push("+----o------------------------------------------");
cave[0][1].push("+-----------------------------------------------");
cave[0][1].push("+---------------------------B-------------------");
cave[0][1].push("+-----------------------------------------------");
cave[0][1].push("++++++++++++++++++++++++++++++++++++++++++++++++");

cave[1][1]= [];
cave[1][1].push("-----------------------------------------------+");
cave[1][1].push("-----------------------------------------------+");
cave[1][1].push("---------------------------------------^-------+");
cave[1][1].push("-----------------------------o---------x-------+");
cave[1][1].push("---------^-------------------------------------+");
cave[1][1].push("---------x-------------------------------------+");
cave[1][1].push("-----------------------------------------------+");
cave[1][1].push("---------------------------------S-------------+");
cave[1][1].push("-----------------------------------------------+");
cave[1][1].push("-----------------------------------------------+");
cave[1][1].push("----------------o------------------------------+");
cave[1][1].push("-----------------------------------------------+");
cave[1][1].push("-----------------------------------------------+");
cave[1][1].push("-----------------------------------------------+");
cave[1][1].push("------------------------------------------o----+");
cave[1][1].push("---------------------------^-------------------+");
cave[1][1].push("---------------------------x-------------------+");
cave[1][1].push("-----------------------------------------------+");
cave[1][1].push("-------S---------------------------------------+");
cave[1][1].push("-----------------------------------------------+");
cave[1][1].push("-----------------------------------------------+");
cave[1][1].push("----------------------o------------------------+");
cave[1][1].push("-----------------------------------------------+");
cave[1][1].push("---------------------------------------S-------+");
cave[1][1].push("----------------^------------------------------+");
cave[1][1].push("----------------x------------------------------+");
cave[1][1].push("++++++++++++++++++++++++++++++++++++++++++++++++");