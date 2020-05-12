function LimitDrag(id)
{
	Drag.call(this,id); // 继承属性
}

for(var i in Drag.prototype)
{
	LimitDrag.prototype[i]=Drag.prototype[i];
}

LimitDrag.prototype.fnMove=function(ev)
{
	var oEvent=ev||event;
	var oLeft=oEvent.clientX-this.disX;
	var oTop=oEvent.clientY-this.disY;

	if(oLeft<0)
	{
		oLeft=0;
	}
	else if(oLeft>document.documentElement.clientWidth-this.oDiv.offsetWidth)
	{
		oLeft=document.documentElement.clientWidth-this.oDiv.offsetWidth;
	}

	this.oDiv.style.left=oLeft+"px";
	this.oDiv.style.top=oTop+"px";
}