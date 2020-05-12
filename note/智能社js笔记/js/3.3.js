function Drag(id)
{
	var _this=this;
	_this.disX=0;
	_this.disY=0;
	_this.oDiv=document.getElementById(id);
	_this.oDiv.onmousedown=function(ev)
	{
		_this.fnDown(ev);

		return false; // 防止选中文字
	};
};
Drag.prototype.fnDown=function(ev)
{
	var _this=this;
	var oEvent=ev||event;

	_this.disX=oEvent.clientX-_this.oDiv.offsetLeft;
	_this.disY=oEvent.clientY-_this.oDiv.offsetTop;

	document.onmousemove=function(ev)
	{
		_this.fnMove(ev);
	};
	document.onmouseup=function(ev)
	{
		_this.fnUp(ev);
	};
};
Drag.prototype.fnMove=function(ev)
{
	var oEvent=ev||event;
	this.oDiv.style.left=oEvent.clientX-this.disX+"px";
	this.oDiv.style.top=oEvent.clientY-this.disY+"px";
};
Drag.prototype.fnUp=function()
{
	document.onmousemove=null;
	document.onmouseup=null;
};