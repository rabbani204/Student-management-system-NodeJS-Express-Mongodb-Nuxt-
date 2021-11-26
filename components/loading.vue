<template>
  <div class="box loading"></div>
</template>
<style>
.box {
  position: absolute;
  width: 180px;
  height: 180px;
  /* background-color: #333; */
  left: 45%;
  margin-left: -40px;
  top: 18%;
  margin-top: -40px;
}

.loading:before {
  content: "";
  position: absolute;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 72px;
  height: 72px;
  top: 50%;
  margin-top: -18px;
  left: 50%;
  margin-left: -18px;
  border-radius: 50%;
  border-width: 5px 4px;
  border-style: solid;
  border-color: #ddbb00 rgba(221, 187, 0, 0.3);
  -webkit-animation: spin 3s infinite;
  -moz-animation: spin 3s infinite;
  animation: spin 3s infinite;
}
.loading:after {
  content: "";
  position: absolute;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  top: 58%;
  margin-top: -3px;
  left: 58%;
  margin-left: -3px;
  border-radius: 50%;
  background-color: #ddbb00;
  -webkit-animation: pulse 6s infinite, borderPulse 6s infinite;
  -moz-animation: pulse 6s infinite, borderPulse 6s infinite;
  animation: pulse 6s infinite, borderPulse 6s infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(360deg);
  }
  100% {
    -webkit-transform: rotate(1080deg);
  }
}
@-moz-keyframes spin {
  0% {
    -moz-transform: rotate(0deg);
  }
  50% {
    -moz-transform: rotate(360deg);
  }
  100% {
    -moz-transform: rotate(1080deg);
  }
}
@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
  100% {
    -webkit-transform: rotate(1080deg);
    -moz-transform: rotate(1080deg);
    -ms-transform: rotate(1080deg);
    -o-transform: rotate(1080deg);
    transform: rotate(1080deg);
  }
}
@-webkit-keyframes pulse {
  0% {
    background-color: rgba(221, 187, 0, 0.2);
  }
  13% {
    background-color: rgba(221, 187, 0, 0.2);
  }
  15% {
    background-color: rgba(255, 234, 119, 0.9);
  }
  28% {
    background-color: rgba(255, 234, 119, 0.9);
  }
  30% {
    background-color: rgba(221, 187, 0, 0.2);
  }
  43% {
    background-color: rgba(221, 187, 0, 0.2);
  }
  45% {
    background-color: rgba(255, 234, 119, 0.9);
  }
  70% {
    background-color: rgba(255, 234, 119, 0.9);
  }
  74% {
    background-color: rgba(221, 187, 0, 0.2);
  }
  100% {
    background-color: rgba(255, 234, 119, 0.9);
  }
}
@-moz-keyframes pulse {
  0% {
    background-color: rgba(221, 187, 0, 0.2);
  }
  13% {
    background-color: rgba(221, 187, 0, 0.2);
  }
  15% {
    background-color: rgba(255, 234, 119, 0.9);
  }
  28% {
    background-color: rgba(255, 234, 119, 0.9);
  }
  30% {
    background-color: rgba(221, 187, 0, 0.2);
  }
  43% {
    background-color: rgba(221, 187, 0, 0.2);
  }
  45% {
    background-color: rgba(255, 234, 119, 0.9);
  }
  70% {
    background-color: rgba(255, 234, 119, 0.9);
  }
  74% {
    background-color: rgba(221, 187, 0, 0.2);
  }
  100% {
    background-color: rgba(255, 234, 119, 0.9);
  }
}
@keyframes pulse {
  0% {
    background-color: rgba(221, 187, 0, 0.2);
  }
  13% {
    background-color: rgba(221, 187, 0, 0.2);
  }
  15% {
    background-color: rgba(255, 234, 119, 0.9);
  }
  28% {
    background-color: rgba(255, 234, 119, 0.9);
  }
  30% {
    background-color: rgba(221, 187, 0, 0.2);
  }
  43% {
    background-color: rgba(221, 187, 0, 0.2);
  }
  45% {
    background-color: rgba(255, 234, 119, 0.9);
  }
  70% {
    background-color: rgba(255, 234, 119, 0.9);
  }
  74% {
    background-color: rgba(221, 187, 0, 0.2);
  }
  100% {
    background-color: rgba(255, 234, 119, 0.9);
  }
}
@-webkit-keyframes borderPulse {
  0% {
    box-shadow: 0 0 0 0 #002347, 0 0 0 1px rgba(221, 187, 0, 0.8);
  }
  40% {
    box-shadow: 0 0 0 1px #002347, 0 0 0 2px rgba(221, 187, 0, 0.8);
  }
  80% {
    box-shadow: 0 0 0 3px #002347, 0 0 1px 3px rgba(221, 187, 0, 0.8);
  }
}
@-moz-keyframes borderPulse {
  0% {
    box-shadow: 0 0 0 0 #002347, 0 0 0 1px rgba(221, 187, 0, 0.8);
  }
  40% {
    box-shadow: 0 0 0 1px #002347, 0 0 0 2px rgba(221, 187, 0, 0.8);
  }
  80% {
    box-shadow: 0 0 0 3px #002347, 0 0 1px 3px rgba(221, 187, 0, 0.8);
  }
}
@keyframes borderPulse {
  0% {
    box-shadow: 0 0 0 0 #002347, 0 0 0 1px rgba(221, 187, 0, 0.8);
  }
  40% {
    box-shadow: 0 0 0 1px #002347, 0 0 0 2px rgba(221, 187, 0, 0.8);
  }
  80% {
    box-shadow: 0 0 0 3px #002347, 0 0 1px 3px rgba(221, 187, 0, 0.8);
  }
}
</style>