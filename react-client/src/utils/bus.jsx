import React from "react";
import EventEmitter from "events"

// class EventBus extends EventEmitter {}
// 不能使用继承方式定义EventBus 💧💧💧💧
const EventBus = new EventEmitter

export default EventBus
