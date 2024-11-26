import { StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function () {
  return (
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none">
      <Path
        d="M24 11.2978C24.0033 10.4505 23.7835 9.61736 23.3627 8.88271C22.9419 8.14806 22.3351 7.53802 21.6038 7.11437C21.6218 6.90639 21.6218 6.69723 21.6038 6.48925C21.6038 5.53276 21.2251 4.61544 20.551 3.9391C19.877 3.26276 18.9627 2.8828 18.0095 2.8828H17.7938C17.5943 2.32778 17.2621 1.83035 16.8264 1.43414C16.3907 1.03793 15.8647 0.75503 15.2947 0.610255C14.7246 0.46548 14.1279 0.463249 13.5568 0.603759C12.9857 0.744269 12.4576 1.02323 12.019 1.41617C11.5803 1.02323 11.0523 0.744269 10.4812 0.603759C9.91008 0.463249 9.31334 0.46548 8.74329 0.610255C8.17323 0.75503 7.64729 1.03793 7.21157 1.43414C6.77585 1.83035 6.44367 2.32778 6.24415 2.8828H6.0285C5.07523 2.8828 4.16101 3.26276 3.48695 3.9391C2.81289 4.61544 2.4342 5.53276 2.4342 6.48925C2.41617 6.69723 2.41617 6.90639 2.4342 7.11437C1.75423 7.50001 1.17851 8.04657 0.757153 8.70646C0.335794 9.36636 0.0815675 10.1196 0.0166052 10.9006C-0.0483571 11.6816 0.0779132 12.4667 0.384425 13.1875C0.690936 13.9084 1.1684 14.5431 1.77525 15.0365C1.3826 15.7714 1.18712 16.596 1.208 17.4295C1.22889 18.2631 1.46541 19.0768 1.89437 19.7909C2.32332 20.505 2.92996 21.095 3.65474 21.5028C4.37952 21.9106 5.19754 22.1224 6.0285 22.1172H6.24415C6.44367 22.6722 6.77585 23.1696 7.21157 23.5659C7.64729 23.9621 8.17323 24.245 8.74329 24.3897C9.31334 24.5345 9.91008 24.5368 10.4812 24.3962C11.0523 24.2557 11.5803 23.9768 12.019 23.5838C12.4576 23.9768 12.9857 24.2557 13.5568 24.3962C14.1279 24.5368 14.7246 24.5345 15.2947 24.3897C15.8647 24.245 16.3907 23.9621 16.8264 23.5659C17.2621 23.1696 17.5943 22.6722 17.7938 22.1172H18.0095C18.8354 22.112 19.6459 21.8927 20.3624 21.4806C21.0789 21.0685 21.6772 20.4775 22.0991 19.7651C22.521 19.0527 22.7522 18.243 22.7704 17.4145C22.7886 16.586 22.5931 15.7669 22.2028 15.0365C22.7616 14.5876 23.2131 14.0188 23.5241 13.3718C23.8351 12.7248 23.9977 12.0161 24 11.2978ZM10.8209 8.35258C10.5599 8.20283 10.2875 8.07419 10.0062 7.96789C9.70431 7.86587 9.37442 7.88834 9.08906 8.03037C8.80371 8.17241 8.58628 8.42236 8.4846 8.72525C8.38291 9.02814 8.40531 9.35915 8.54687 9.64547C8.68842 9.93178 8.93753 10.15 9.2394 10.252C9.7006 10.4193 10.0995 10.7245 10.3823 11.1265C10.6652 11.5285 10.8182 12.0079 10.8209 12.5V14.3633C10.5599 14.2136 10.2875 14.0849 10.0062 13.9786C9.70431 13.8766 9.37442 13.8991 9.08906 14.0411C8.80371 14.1832 8.58628 14.4331 8.4846 14.736C8.38291 15.0389 8.40531 15.3699 8.54687 15.6562C8.68842 15.9425 8.93753 16.1607 9.2394 16.2627C9.7006 16.43 10.0995 16.7353 10.3823 17.1373C10.6652 17.5393 10.8182 18.0187 10.8209 18.5108V20.9151C10.8209 21.2339 10.6947 21.5397 10.47 21.7651C10.2453 21.9906 9.94055 22.1172 9.62279 22.1172C9.391 22.1157 9.16462 22.0467 8.9711 21.9187C8.77758 21.7907 8.62523 21.6091 8.53252 21.3959C8.73341 21.2776 8.9256 21.1451 9.10761 20.9992C9.22876 20.8982 9.32889 20.7742 9.40228 20.6343C9.47567 20.4945 9.52089 20.3415 9.53535 20.1841C9.54982 20.0267 9.53324 19.8679 9.48657 19.717C9.4399 19.566 9.36405 19.4257 9.26336 19.3042C9.16266 19.1826 9.03909 19.0821 8.8997 19.0085C8.76031 18.9349 8.60783 18.8895 8.45096 18.875C8.29409 18.8605 8.13591 18.8771 7.98545 18.9239C7.83499 18.9708 7.69519 19.0469 7.57404 19.1479C7.14144 19.5133 6.59398 19.7135 6.0285 19.7129C5.39298 19.7129 4.7835 19.4596 4.33413 19.0087C3.88476 18.5578 3.6323 17.9463 3.6323 17.3086C3.63803 16.8561 3.77092 16.4144 4.01569 16.0343C4.28457 16.0827 4.55723 16.1069 4.8304 16.1065C5.14815 16.1065 5.45289 15.9798 5.67758 15.7543C5.90227 15.5289 6.0285 15.2231 6.0285 14.9043C6.0285 14.5855 5.90227 14.2797 5.67758 14.0543C5.45289 13.8288 5.14815 13.7022 4.8304 13.7022C4.54739 13.7038 4.26672 13.6507 4.00371 13.5459C3.57281 13.3899 3.19548 13.1133 2.91643 12.7489C2.63737 12.3844 2.46829 11.9473 2.4292 11.4893C2.39012 11.0314 2.48267 10.5718 2.6959 10.165C2.90913 9.7582 3.23409 9.42126 3.6323 9.19409C3.80255 9.35125 3.98706 9.49212 4.18343 9.61484C4.45987 9.77425 4.78811 9.81695 5.09593 9.73353C5.40375 9.65012 5.66594 9.44742 5.82482 9.17004C5.9837 8.89266 6.02625 8.56331 5.94311 8.25445C5.85998 7.94559 5.65797 7.68251 5.38152 7.5231C5.21286 7.42974 5.0722 7.29276 4.97417 7.12639C4.8634 6.93338 4.81329 6.71131 4.8304 6.48925C4.8304 6.17042 4.95663 5.86465 5.18131 5.6392C5.406 5.41375 5.71074 5.2871 6.0285 5.2871C6.11196 5.27541 6.19663 5.27541 6.2801 5.2871C6.34352 5.48025 6.41957 5.66899 6.50773 5.85211C6.58601 5.98986 6.69067 6.11071 6.81568 6.20771C6.9407 6.3047 7.08361 6.37592 7.23617 6.41726C7.38874 6.45861 7.54795 6.46926 7.70464 6.4486C7.86132 6.42794 8.01239 6.37639 8.14913 6.2969C8.41475 6.13655 8.60809 5.87912 8.68852 5.57873C8.76895 5.27834 8.73021 4.95836 8.58044 4.68602C8.47992 4.50162 8.42641 4.29513 8.42469 4.08495C8.42469 3.76612 8.55092 3.46034 8.77561 3.2349C9.00029 3.00945 9.30503 2.8828 9.62279 2.8828C9.94055 2.8828 10.2453 3.00945 10.47 3.2349C10.6947 3.46034 10.8209 3.76612 10.8209 4.08495V8.35258ZM20.0343 13.5459C19.7712 13.6507 19.4906 13.7038 19.2076 13.7022C18.8898 13.7022 18.5851 13.8288 18.3604 14.0543C18.1357 14.2797 18.0095 14.5855 18.0095 14.9043C18.0095 15.2231 18.1357 15.5289 18.3604 15.7543C18.5851 15.9798 18.8898 16.1065 19.2076 16.1065C19.4807 16.1069 19.7534 16.0827 20.0223 16.0343C20.267 16.4144 20.3999 16.8561 20.4057 17.3086C20.4057 17.9463 20.1532 18.5578 19.7038 19.0087C19.2545 19.4596 18.645 19.7129 18.0095 19.7129C17.444 19.7135 16.8965 19.5133 16.4639 19.1479C16.2193 18.9438 15.9038 18.8457 15.587 18.875C15.2702 18.9043 14.978 19.0587 14.7746 19.3042C14.5712 19.5497 14.4734 19.8662 14.5026 20.1841C14.5318 20.5019 14.6857 20.7952 14.9304 20.9992C15.1124 21.1451 15.3046 21.2776 15.5054 21.3959C15.4127 21.6091 15.2604 21.7907 15.0669 21.9187C14.8733 22.0467 14.647 22.1157 14.4152 22.1172C14.0974 22.1172 13.7927 21.9906 13.568 21.7651C13.3433 21.5397 13.2171 21.2339 13.2171 20.9151V18.5108C13.2197 18.0187 13.3728 17.5393 13.6556 17.1373C13.9384 16.7353 14.3374 16.43 14.7986 16.2627C15.1004 16.1607 15.3495 15.9425 15.4911 15.6562C15.6327 15.3699 15.6551 15.0389 15.5534 14.736C15.4517 14.4331 15.2343 14.1832 14.9489 14.0411C14.6636 13.8991 14.3337 13.8766 14.0318 13.9786C13.7505 14.0849 13.478 14.2136 13.2171 14.3633V12.5C13.2197 12.0079 13.3728 11.5285 13.6556 11.1265C13.9384 10.7245 14.3374 10.4193 14.7986 10.252C15.1004 10.15 15.3495 9.93178 15.4911 9.64547C15.6327 9.35915 15.6551 9.02814 15.5534 8.72525C15.4517 8.42236 15.2343 8.17241 14.9489 8.03037C14.6636 7.88834 14.3337 7.86587 14.0318 7.96789C13.7505 8.07419 13.478 8.20283 13.2171 8.35258V4.08495C13.2171 3.76612 13.3433 3.46034 13.568 3.2349C13.7927 3.00945 14.0974 2.8828 14.4152 2.8828C14.7329 2.8828 15.0377 3.00945 15.2624 3.2349C15.4871 3.46034 15.6133 3.76612 15.6133 4.08495C15.6116 4.29513 15.5581 4.50162 15.4575 4.68602C15.3778 4.82251 15.3257 4.97344 15.3043 5.13017C15.2828 5.28689 15.2924 5.44633 15.3325 5.59933C15.3725 5.75233 15.4423 5.8959 15.5378 6.02179C15.6333 6.14768 15.7526 6.25343 15.8888 6.33297C16.0256 6.41245 16.1766 6.46401 16.3333 6.48467C16.49 6.50532 16.6492 6.49467 16.8018 6.45333C16.9544 6.41199 17.0973 6.34077 17.2223 6.24377C17.3473 6.14678 17.452 6.02592 17.5302 5.88817C17.6199 5.69335 17.696 5.49251 17.7579 5.2871C17.8413 5.27541 17.926 5.27541 18.0095 5.2871C18.3272 5.2871 18.632 5.41375 18.8567 5.6392C19.0813 5.86465 19.2076 6.17042 19.2076 6.48925C19.2057 6.72491 19.1349 6.95483 19.0039 7.15043C18.9059 7.30643 18.7698 7.43471 18.6085 7.5231C18.3321 7.68251 18.1301 7.94559 18.0469 8.25445C17.9638 8.56331 18.0063 8.89266 18.1652 9.17004C18.3241 9.44742 18.5863 9.65012 18.8941 9.73353C19.2019 9.81695 19.5302 9.77425 19.8066 9.61484C20.0217 9.49811 20.2227 9.35693 20.4057 9.19409C20.8052 9.41725 21.1328 9.75047 21.3497 10.1544C21.5666 10.5583 21.6638 11.0161 21.6298 11.4737C21.5958 11.9313 21.432 12.3695 21.1578 12.7367C20.8835 13.1039 20.5103 13.3847 20.0822 13.5459H20.0343Z"
        fill="#22C55E"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({});
