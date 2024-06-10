<template>
  {{ drinkList.length }}
  <MySheet class="mx-auto my-auto" max-width="600">
    <v-row no-gutters align="center" justify="center" class="mb-2 ga-3">
      <span>方圓</span>
      <MySelect class="distance" v-model="maxDistance" :items="maxDistanceItems" />
      <span>公里以內</span>
    </v-row>
    <v-row no-gutters align="center" justify="center" class="mt-16">
      <MyButton class="w-50" @click="sendAPI">產生轉盤內容</MyButton>
    </v-row>
  </MySheet>

  <div class="d-flex justify-center mt-4">
    <MyLuckyWheel :prizes="drinkList" width="400px" height="400px" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import { useAppStore } from '@/stores/appStore'
const appStore = useAppStore()

// proxy port
import { proxyPort } from '@@/proxy-server/config.mjs'

const apiKey = 'AIzaSyAJrX9RSNt_66ttj29_ycuG6F1WCMjLuz8'

const lat = ref(0)
const lng = ref(0)

const drinkList = ref([])

// 取得經緯度
onMounted(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    lat.value = position.coords.latitude
    lng.value = position.coords.longitude
  })
})

// 最大搜尋半徑
const maxDistance = ref(1)
const maxDistanceItems = [1, 2.5, 5, 10, 20, 50]

const sendAPI = async () => {
  drinkList.value = [
    {
      business_status: 'OPERATIONAL',
      formatted_address: '106台灣台北市大安區復興南路二段323號',
      geometry: {
        location: {
          lat: 25.0238974,
          lng: 121.5435673
        },
        viewport: {
          northeast: {
            lat: 25.02524827989272,
            lng: 121.5448576298927
          },
          southwest: {
            lat: 25.02254862010727,
            lng: 121.5421579701073
          }
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
      icon_background_color: '#7B9EB0',
      icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
      name: '春山茶水舖',
      opening_hours: {
        open_now: true
      },
      photos: [
        {
          height: 3024,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/101378403074559440107">Iris Chan</a>'
          ],
          photo_reference:
            'AUc7tXV5rT4yR5koJHhRCO5EW3cGysJUGRCqsIkFovZU_UDUVdbSMMYSnxMB0un5VFSttcz2g2yRmGIEQhw-8pr_iL3DOHSe0OHrUUyY20-ZDpYXYgejECYwBRz8tanIlKjYxfwgHrLJnkXmKNnkyB4JG5W7WmX9Z3f8X4OApi1FnE592DT1',
          width: 4032
        }
      ],
      place_id: 'ChIJhffc2i6qQjQRcEMd2wIyjGc',
      plus_code: {
        compound_code: '2GFV+HC 臥龍里 台北市大安區',
        global_code: '7QQ32GFV+HC'
      },
      rating: 4.5,
      reference: 'ChIJhffc2i6qQjQRcEMd2wIyjGc',
      types: ['cafe', 'food', 'point_of_interest', 'establishment'],
      user_ratings_total: 1677
    },
    {
      business_status: 'OPERATIONAL',
      formatted_address: '302台灣新竹縣竹北市光明三路85號',
      geometry: {
        location: {
          lat: 24.8302604,
          lng: 121.008172
        },
        viewport: {
          northeast: {
            lat: 24.83165427989272,
            lng: 121.0095496298927
          },
          southwest: {
            lat: 24.82895462010728,
            lng: 121.0068499701073
          }
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
      icon_background_color: '#7B9EB0',
      icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
      name: '諾姆精品茶飲',
      opening_hours: {
        open_now: true
      },
      photos: [
        {
          height: 4656,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/111160622345610562853">姜文雅</a>'
          ],
          photo_reference:
            'AUc7tXUSjNx_xDM1Du2mbNYbxcG3VuDkG8D590Nsv12VkriPBTqDd8GYIeVeqYxlkdQ7zFhtTD1k76bYsn6X7MqDoAnblKzSrYiRpmVtSJiQvOf--akIyaGUJMjNPtFQMdRMjb7t2PZ0a2b75no_vBpCQlrvQReb-A6xK6Iwuu5ykVobJAy_',
          width: 3492
        }
      ],
      place_id: 'ChIJWb7ufMw3aDQRr-IqoR0ARzY',
      plus_code: {
        compound_code: 'R2J5+47 北崙里 新竹縣竹北市',
        global_code: '7QP3R2J5+47'
      },
      rating: 5,
      reference: 'ChIJWb7ufMw3aDQRr-IqoR0ARzY',
      types: ['point_of_interest', 'establishment'],
      user_ratings_total: 81
    },
    {
      business_status: 'OPERATIONAL',
      formatted_address: '310台灣新竹縣竹東鎮東寧路三段22號',
      geometry: {
        location: {
          lat: 24.7370823,
          lng: 121.0881357
        },
        viewport: {
          northeast: {
            lat: 24.73843452989272,
            lng: 121.0894891298928
          },
          southwest: {
            lat: 24.73573487010728,
            lng: 121.0867894701073
          }
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
      icon_background_color: '#7B9EB0',
      icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
      name: '金茶伍手作飲品-竹東東寧門市 WOO CHA TEA SHOP',
      opening_hours: {
        open_now: true
      },
      photos: [
        {
          height: 720,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/110817544055323639033">A Google User</a>'
          ],
          photo_reference:
            'AUc7tXUjlyp6ccmkK0NKywsOHdT52_3OcYGyQoUiZSR-YBoi-wy4qu2DC9oyvGBXoThWF6F3wC2a-JHlXnHXNup8MqBFIAEfeh3FrdlOAT9DMYysHi4t2EfhP5WBY1RidRF10hGiUWAAz5W5eTYZjnlv42xaY11nz1W8IjnRC99u7axqLlLQ',
          width: 720
        }
      ],
      place_id: 'ChIJaSGMLZtHaDQRXt1UvKY0QA8',
      plus_code: {
        compound_code: 'P3PQ+R7 商華里 新竹縣竹東鎮',
        global_code: '7QP3P3PQ+R7'
      },
      rating: 4.3,
      reference: 'ChIJaSGMLZtHaDQRXt1UvKY0QA8',
      types: ['cafe', 'food', 'point_of_interest', 'establishment'],
      user_ratings_total: 215
    },
    {
      business_status: 'OPERATIONAL',
      formatted_address: '106台灣台北市大安區建國南路二段151巷10號',
      geometry: {
        location: {
          lat: 25.0286602,
          lng: 121.5383777
        },
        viewport: {
          northeast: {
            lat: 25.03008307989272,
            lng: 121.5397266298928
          },
          southwest: {
            lat: 25.02738342010728,
            lng: 121.5370269701073
          }
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
      icon_background_color: '#7B9EB0',
      icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
      name: '茶鬍 Beard Cup 大安建國店',
      opening_hours: {
        open_now: true
      },
      photos: [
        {
          height: 1672,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/110260312110050463068">茶鬍Beard Cup</a>'
          ],
          photo_reference:
            'AUc7tXUGIkJRs_1VZSY7TG5-Z6xcM5-VuoS4kciX3FA0ZATun1u3rPV2nF9ay09-fyZgJz8-CCkS18DNsLH5VRyL8rEh3hXOi3I3sXO6Zw54AHKMA84wIgMLWE17IIz4XcperE38AGWRGdatxJ2EaFwe7hmrCbfZtUM_nnN_two5Ya69sqGy',
          width: 2508
        }
      ],
      place_id: 'ChIJZb9oaiqqQjQR4aQAovtfeeY',
      plus_code: {
        compound_code: '2GHQ+F9 新龍里 台北市大安區',
        global_code: '7QQ32GHQ+F9'
      },
      rating: 4.2,
      reference: 'ChIJZb9oaiqqQjQR4aQAovtfeeY',
      types: ['point_of_interest', 'establishment'],
      user_ratings_total: 209
    },
    {
      business_status: 'OPERATIONAL',
      formatted_address: '103台灣台北市大同區重慶北路三段335巷42號',
      geometry: {
        location: {
          lat: 25.0744625,
          lng: 121.5152171
        },
        viewport: {
          northeast: {
            lat: 25.07586482989272,
            lng: 121.5165657798927
          },
          southwest: {
            lat: 25.07316517010728,
            lng: 121.5138661201073
          }
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
      icon_background_color: '#7B9EB0',
      icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
      name: '奶茶站飲料坊',
      opening_hours: {
        open_now: true
      },
      photos: [
        {
          height: 4032,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/105519603144492826840">105519603144492826840</a>'
          ],
          photo_reference:
            'AUc7tXUyX5tSVjGtdaSe9rw-U8Nklkjby5TvnNvDvA76UBw_DH60oPEbDsbYk7w7TpjRxiuYEHqVhbJK5gAWH2ELDyiImqkAlSMDta9u_IpgJyCYDRLUeQOox6MgDprny5KGmbd-gm5kd33HyIiDmrJ9m1mOPmhxOeTrxlrs1JMRKC68gpVV',
          width: 3024
        }
      ],
      place_id: 'ChIJLT-s8EmpQjQRJQ44XnTzz9Y',
      plus_code: {
        compound_code: '3GF8+Q3 保安里 台北市大同區',
        global_code: '7QQ33GF8+Q3'
      },
      price_level: 1,
      rating: 4.5,
      reference: 'ChIJLT-s8EmpQjQRJQ44XnTzz9Y',
      types: ['point_of_interest', 'establishment'],
      user_ratings_total: 167
    },
    {
      business_status: 'OPERATIONAL',
      formatted_address: '100台灣台北市中正區忠孝西路一段49號號B3',
      geometry: {
        location: {
          lat: 25.0478258,
          lng: 121.5177255
        },
        viewport: {
          northeast: {
            lat: 25.04945337989272,
            lng: 121.5192877298927
          },
          southwest: {
            lat: 25.04675372010728,
            lng: 121.5165880701073
          }
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
      icon_background_color: '#7B9EB0',
      icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
      name: '樂法Le Phare - 京站店',
      opening_hours: {
        open_now: true
      },
      photos: [
        {
          height: 2560,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/114026167500019761899">廖婉玲</a>'
          ],
          photo_reference:
            'AUc7tXXW2GuprsLpkHNyz6dPW0KPtDyx50xsQmiM8nrxnrLn2L2Ze4fnxSRtqX4EeRhtHZT_6dU6_BJHXtoKVDQ_-ymdiAitrShZl0WM47OzRJpb3wCUwWwPX-6NqLInDcV5jO3brc0_Vj2IsY8pCODMlFgrlewXgdDPdgQ3BVodBvFrDtAN',
          width: 1920
        }
      ],
      place_id: 'ChIJFQBAdXKpQjQRRTZuH_kG8MI',
      plus_code: {
        compound_code: '2GX9+43 黎明里 台北市中正區',
        global_code: '7QQ32GX9+43'
      },
      price_level: 1,
      rating: 3.7,
      reference: 'ChIJFQBAdXKpQjQRRTZuH_kG8MI',
      types: ['point_of_interest', 'establishment'],
      user_ratings_total: 693
    },
    {
      business_status: 'OPERATIONAL',
      formatted_address: '242台灣新北市新莊區富國路76號',
      geometry: {
        location: {
          lat: 25.025901,
          lng: 121.419927
        },
        viewport: {
          northeast: {
            lat: 25.02727572989272,
            lng: 121.4212871298927
          },
          southwest: {
            lat: 25.02457607010728,
            lng: 121.4185874701073
          }
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
      icon_background_color: '#7B9EB0',
      icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
      name: '清心福全新莊富國店-珍珠奶茶手搖飲料專賣店',
      opening_hours: {
        open_now: true
      },
      photos: [
        {
          height: 4032,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/109555701450324266290">黃一一</a>'
          ],
          photo_reference:
            'AUc7tXUlMOXOfPaSoGNmGHBkDb7ahc1yyZmWvtygNXflvNlUXm6jEqfVCXWQinl57ZRt8q9JHOvuN3pFvZxQSCuqIl20PPr1DK4_IIRdp57PpFgYFZhvEsjmfu0WQRtWP0pzJAdvIJdnJf5FgqY0Iwd6AiS61IEHJtROxZnwuGPkaM8hRZ3L',
          width: 3024
        }
      ],
      place_id: 'ChIJBcPk_4ynQjQRjMD-28UXFy8',
      plus_code: {
        compound_code: '2CG9+9X 裕民里 新北市新莊區',
        global_code: '7QQ32CG9+9X'
      },
      price_level: 1,
      rating: 3.9,
      reference: 'ChIJBcPk_4ynQjQRjMD-28UXFy8',
      types: ['point_of_interest', 'establishment'],
      user_ratings_total: 610
    },
    {
      business_status: 'OPERATIONAL',
      formatted_address: '300台灣新竹市東區建功一路46號',
      geometry: {
        location: {
          lat: 24.7978117,
          lng: 120.9981177
        },
        viewport: {
          northeast: {
            lat: 24.79914387989272,
            lng: 120.9993975798927
          },
          southwest: {
            lat: 24.79644422010728,
            lng: 120.9966979201073
          }
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
      icon_background_color: '#7B9EB0',
      icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
      name: '八曜和茶 新竹清大門市',
      opening_hours: {
        open_now: true
      },
      photos: [
        {
          height: 3807,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/117774180411753083193">Chien-Fong Lo</a>'
          ],
          photo_reference:
            'AUc7tXVcQk2aLpbRofdoDcbdjbSAlAP7y-ekCe15mV2QQC7V6kU-3CRdQFKTDg1F16KEVobGboMxnUEGAZqH80RKUXNCZVoudweBAvGrzqGYEsHbB-uKsR11zECjECR1hKfBiQ5PlIGExHnwYAscFFZeXVrqVLt8rJmIAb3g34v3hoDDKd7N',
          width: 2855
        }
      ],
      place_id: 'ChIJj7XpfsA3aDQRfORPlSVpJbo',
      plus_code: {
        compound_code: 'QXXX+46 軍功里 新竹市東區',
        global_code: '7QP2QXXX+46'
      },
      rating: 3.6,
      reference: 'ChIJj7XpfsA3aDQRfORPlSVpJbo',
      types: ['point_of_interest', 'establishment'],
      user_ratings_total: 613
    },
    {
      business_status: 'OPERATIONAL',
      formatted_address: '320台灣桃園市中壢區元化路213號',
      geometry: {
        location: {
          lat: 24.9608555,
          lng: 121.2272784
        },
        viewport: {
          northeast: {
            lat: 24.96215077989272,
            lng: 121.2285545798927
          },
          southwest: {
            lat: 24.95945112010728,
            lng: 121.2258549201073
          }
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
      icon_background_color: '#7B9EB0',
      icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
      name: '曼士茶Manstea-桃園中壢店 #奶蓋霸主#中壢必喝',
      opening_hours: {
        open_now: true
      },
      photos: [
        {
          height: 4032,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/100613751943694664571">張軒慈</a>'
          ],
          photo_reference:
            'AUc7tXWNtgo96Khp7rzuW8SRtRUcbd9bayy_BFrFnRdrgjPuvDa_5soOZ-8ulQ56J2AXUu5p20uOtekMrEIhqnHJ_5KQKDeJ1FMqBV8PSee0JSaY5gDRuVmi1LYKaArq4vtR76hsu73BN0cDQduS1BcHJMAbikWqUIXW_5xZT2XWVzBZldwp',
          width: 3024
        }
      ],
      place_id: 'ChIJ-xdIqQ8jaDQRwbBobvkfy50',
      plus_code: {
        compound_code: 'X66G+8W 中壢區 桃園市',
        global_code: '7QP3X66G+8W'
      },
      rating: 4.9,
      reference: 'ChIJ-xdIqQ8jaDQRwbBobvkfy50',
      types: ['point_of_interest', 'establishment'],
      user_ratings_total: 93
    },
    {
      business_status: 'OPERATIONAL',
      formatted_address: '105台灣台北市松山區敦化北路199巷2弄1號',
      geometry: {
        location: {
          lat: 25.0556874,
          lng: 121.5500578
        },
        viewport: {
          northeast: {
            lat: 25.05703682989272,
            lng: 121.5513536298927
          },
          southwest: {
            lat: 25.05433717010728,
            lng: 121.5486539701073
          }
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
      icon_background_color: '#7B9EB0',
      icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
      name: '茶聚CHAGE敦北長庚店',
      opening_hours: {
        open_now: true
      },
      photos: [
        {
          height: 1318,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/114339529264817898944">A Google User</a>'
          ],
          photo_reference:
            'AUc7tXU1m7PELApUPi2CdbJfGnyVHRwH7SAwBmNShyAbIv-JO9GzSqtROveETJ1vNTL7e7_1htOufsiRwztKdEnRt9dSwjwvrW6p9BQMe3CLpc6vRRu4fai2qOzu9iBUqoVw7wo4BC01gK9uQrROHX_4I2ICk-oLADoUZ2P9R1aY54xjjfRR',
          width: 1084
        }
      ],
      place_id: 'ChIJV938cNurQjQR7EO12ip4yTs',
      plus_code: {
        compound_code: '3H42+72 中華里 台北市松山區',
        global_code: '7QQ33H42+72'
      },
      price_level: 1,
      rating: 4.3,
      reference: 'ChIJV938cNurQjQR7EO12ip4yTs',
      types: ['cafe', 'food', 'point_of_interest', 'establishment'],
      user_ratings_total: 64
    },
    {
      business_status: 'OPERATIONAL',
      formatted_address: '330台灣桃園市桃園區民生路142號',
      geometry: {
        location: {
          lat: 24.9926014,
          lng: 121.3136449
        },
        viewport: {
          northeast: {
            lat: 24.99393857989272,
            lng: 121.3149766298927
          },
          southwest: {
            lat: 24.99123892010728,
            lng: 121.3122769701073
          }
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
      icon_background_color: '#7B9EB0',
      icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
      name: '清心福全桃園成功店-珍珠奶茶手搖飲料專賣店',
      opening_hours: {
        open_now: true
      },
      photos: [
        {
          height: 4032,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/106529316231740949092">Andy 劉</a>'
          ],
          photo_reference:
            'AUc7tXXoyvkJ68h-9lVwZHYtnkQCYUzI49oaGvZ8-gicLmUZUovjVja9w0l7o8UDkuyo-MTtXjeIzxWUJgeeu-gyoaichrTtcGJ7Pa4T-_JGh__U8iekLxIcH--DeXXS2em7-zZWgP7z31JzYPiZjl2jTxv28iyLXmjLyz70fbRx9L50KoVI',
          width: 3024
        }
      ],
      place_id: 'ChIJZ84NUjEfaDQRLxZRwLLy7ec',
      plus_code: {
        compound_code: 'X8V7+2F 武陵里 桃園市桃園區',
        global_code: '7QP3X8V7+2F'
      },
      price_level: 1,
      rating: 3.8,
      reference: 'ChIJZ84NUjEfaDQRLxZRwLLy7ec',
      types: ['point_of_interest', 'establishment'],
      user_ratings_total: 172
    },
    {
      business_status: 'OPERATIONAL',
      formatted_address: '242台灣新北市新莊區雙鳳路24號',
      geometry: {
        location: {
          lat: 25.0270927,
          lng: 121.4167274
        },
        viewport: {
          northeast: {
            lat: 25.02838462989272,
            lng: 121.4180538798927
          },
          southwest: {
            lat: 25.02568497010727,
            lng: 121.4153542201073
          }
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png',
      icon_background_color: '#FF9E67',
      icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet',
      name: '清心福全新莊雙鳳店-珍珠奶茶手搖飲料專賣店',
      opening_hours: {
        open_now: true
      },
      photos: [
        {
          height: 4032,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/106782070176291821935">陳小勳</a>'
          ],
          photo_reference:
            'AUc7tXUZRjc1DlCy00eYJLVmsP8Ed36ew-_ERxIoeO0NTwQD7uFc7c5709MFTf7_NORgZgil60LTCawk1fn3DwCY9wqsXrarYmEGJu-1-29dgAirNDPsMiHd0pjNFgkCsh4lI0Lbmx5YOjq0ab7886p84wDs0daFaq6yykpJ_jpRzADOwrhi',
          width: 3024
        }
      ],
      place_id: 'ChIJ-bx4eY6nQjQR_HeFc6yQGtk',
      plus_code: {
        compound_code: '2CG8+RM 合鳳里 新北市新莊區',
        global_code: '7QQ32CG8+RM'
      },
      price_level: 1,
      rating: 4.1,
      reference: 'ChIJ-bx4eY6nQjQR_HeFc6yQGtk',
      types: ['cafe', 'food', 'point_of_interest', 'establishment'],
      user_ratings_total: 254
    },
    {
      business_status: 'OPERATIONAL',
      formatted_address: '235台灣新北市中和區橋和路105號1樓',
      geometry: {
        location: {
          lat: 25.0056998,
          lng: 121.4909111
        },
        viewport: {
          northeast: {
            lat: 25.00701402989272,
            lng: 121.4922705298927
          },
          southwest: {
            lat: 25.00431437010728,
            lng: 121.4895708701072
          }
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
      icon_background_color: '#7B9EB0',
      icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
      name: '清心福全中和橋和店-珍珠奶茶手搖飲料專賣店',
      opening_hours: {
        open_now: true
      },
      photos: [
        {
          height: 4032,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/104737671291651494116">許彰文</a>'
          ],
          photo_reference:
            'AUc7tXWvRBU56SF0VLGVPI22JztveW2m2cosA7lJ8pmu3omv24lKa0zPxMAM4kWB6ZRKlKaQ30HLvDvTadc6x9YGE2LdFSfZcxmCWsrye37vKDMi_2C8T-jlcWhJKiVhyIyw8HEZRWbP3Y5RAfzsmrZlPb1Z3p9c7Zqj7b6o6Bqwpnms1GQv',
          width: 3024
        }
      ],
      place_id: 'ChIJJVStSCuoQjQR2uOvg6xGpqM',
      plus_code: {
        compound_code: '2F4R+79 中原里 新北市中和區',
        global_code: '7QQ32F4R+79'
      },
      price_level: 1,
      rating: 3.4,
      reference: 'ChIJJVStSCuoQjQR2uOvg6xGpqM',
      types: ['point_of_interest', 'establishment'],
      user_ratings_total: 369
    },
    {
      business_status: 'OPERATIONAL',
      formatted_address: '241台灣新北市三重區大同北路53號',
      geometry: {
        location: {
          lat: 25.0632336,
          lng: 121.495293
        },
        viewport: {
          northeast: {
            lat: 25.06457172989273,
            lng: 121.4966047798927
          },
          southwest: {
            lat: 25.06187207010728,
            lng: 121.4939051201073
          }
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
      icon_background_color: '#7B9EB0',
      icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
      name: '清心福全三重大同北店-珍珠奶茶手搖飲料專賣店',
      opening_hours: {
        open_now: true
      },
      photos: [
        {
          height: 1046,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/109923745707051559621">A Google User</a>'
          ],
          photo_reference:
            'AUc7tXUXBo9GBa0ac2Mc_JfGiuotsGXC2UeNIbHMieAIFqhmyQ0Hp1rbCTh8RRw3KABR_tm-lZyCGtpg34b3aa9YZys9z8dO-twPJUipR2cz2FQBNpQAreisNdIOZPrwmnuxX4rJ2eF4IGbNxgnUnpjR-8b45lCsY842WGqx3Z2NAKO0nc_7',
          width: 1861
        }
      ],
      place_id: 'ChIJB8zXWDypQjQRWOUWF0nUrhM',
      plus_code: {
        compound_code: '3F7W+74 正德里 新北市三重區',
        global_code: '7QQ33F7W+74'
      },
      rating: 3.4,
      reference: 'ChIJB8zXWDypQjQRWOUWF0nUrhM',
      types: ['point_of_interest', 'establishment'],
      user_ratings_total: 67
    },
    {
      business_status: 'OPERATIONAL',
      formatted_address: '238台灣新北市樹林區博愛一街1號',
      geometry: {
        location: {
          lat: 24.9912193,
          lng: 121.4250787
        },
        viewport: {
          northeast: {
            lat: 24.99253747989273,
            lng: 121.4264185298927
          },
          southwest: {
            lat: 24.98983782010728,
            lng: 121.4237188701072
          }
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
      icon_background_color: '#7B9EB0',
      icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
      name: '樹林果都飲料',
      opening_hours: {
        open_now: true
      },
      photos: [
        {
          height: 4032,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/102921777798527922003">趙英宏</a>'
          ],
          photo_reference:
            'AUc7tXWPl-XzH22CEUmfiPufCHjCGonXp8VpFE80c_iUJVCl4yOnFdxBacIRfS9pvYK-Ne0BG4-d_uXUYaFA3rasXdmu1Dnwb-5PLYHZMaose4qAXuth_92Cer6LLljL8jBFGyZQCwnjFHqKEhrYfiewINHh8k6OksnLLNxvJwE4y2OF0PMa',
          width: 3024
        }
      ],
      place_id: 'ChIJIZFVZj4daDQRwotDGSZqkfQ',
      plus_code: {
        compound_code: 'XCRG+F2 樹北里 新北市樹林區',
        global_code: '7QP3XCRG+F2'
      },
      rating: 3.7,
      reference: 'ChIJIZFVZj4daDQRwotDGSZqkfQ',
      types: ['point_of_interest', 'establishment'],
      user_ratings_total: 120
    },
    {
      business_status: 'OPERATIONAL',
      formatted_address: '231台灣新北市新店區寶中路94號2樓之2',
      geometry: {
        location: {
          lat: 24.9797116,
          lng: 121.5489955
        },
        viewport: {
          northeast: {
            lat: 24.98097812989272,
            lng: 121.5502523798927
          },
          southwest: {
            lat: 24.97827847010728,
            lng: 121.5475527201073
          }
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png',
      icon_background_color: '#4B96F3',
      icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet',
      name: '日安喝茶｜ 巴黎甜點風味茶｜無咖啡因花果茶｜ 歐洲進口天然花草茶｜法式甜點風味茶',
      opening_hours: {
        open_now: true
      },
      photos: [
        {
          height: 4032,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/100592884881220651158">jay Vincent</a>'
          ],
          photo_reference:
            'AUc7tXWxjFc3O7uR2bbJYREXugNbtdbt_9XrBPyxqXS97uws1VgjP_nv8Medub6PEUdmoB67ggqfiq7GFfhFVZ9MEha82gd3W_XSo7Nn434rYaSSbhMM2Yee8h5s4TnZhpEB2fE72LVtEOw3PZaNmT0-on8t0e5-12PBLAyuH1G8H-96i5sf',
          width: 3024
        }
      ],
      place_id: 'ChIJKxGzerqpQjQR4dFqZwfGe_k',
      plus_code: {
        compound_code: 'XGHX+VH 寶福里 新北市新店區',
        global_code: '7QP3XGHX+VH'
      },
      rating: 4.9,
      reference: 'ChIJKxGzerqpQjQR4dFqZwfGe_k',
      types: ['food', 'point_of_interest', 'store', 'health', 'establishment'],
      user_ratings_total: 316
    },
    {
      business_status: 'OPERATIONAL',
      formatted_address: '252台灣新北市三芝區淡金路二段14號',
      geometry: {
        location: {
          lat: 25.2595481,
          lng: 121.5024722
        },
        viewport: {
          northeast: {
            lat: 25.26089112989272,
            lng: 121.5038326298927
          },
          southwest: {
            lat: 25.25819147010728,
            lng: 121.5011329701073
          }
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
      icon_background_color: '#7B9EB0',
      icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
      name: '清心福全三芝店-珍珠奶茶手搖飲料專賣店',
      opening_hours: {
        open_now: true
      },
      photos: [
        {
          height: 4032,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/104075454263504345499">邱小馨</a>'
          ],
          photo_reference:
            'AUc7tXUf3LoKYph1DnFDk7nMbQ7MpEWLnCqqA2BdEq_CRYyp5pHG54gyFR2iQZ9GzBatbqMhSfCVsEPng1xZAQ0IM1Tl7PbgXg6t3PAd5ilyXtkIKkia_OQoC0AhPuWZDVJQURSfXqxykJq9np0VQLG5_2TF4s9SMIBUDkYcpNFPf9qXk0HK',
          width: 3024
        }
      ],
      place_id: 'ChIJv7NB4NG2QjQRdFB0tJkoDX8',
      plus_code: {
        compound_code: '7G52+RX 埔坪里 新北市三芝區',
        global_code: '7QQ37G52+RX'
      },
      price_level: 1,
      rating: 3.6,
      reference: 'ChIJv7NB4NG2QjQRdFB0tJkoDX8',
      types: ['point_of_interest', 'establishment'],
      user_ratings_total: 108
    },
    {
      business_status: 'OPERATIONAL',
      formatted_address: '350台灣苗栗縣竹南鎮華東街86號',
      geometry: {
        location: {
          lat: 24.6900343,
          lng: 120.8781785
        },
        viewport: {
          northeast: {
            lat: 24.69132072989272,
            lng: 120.8795244798927
          },
          southwest: {
            lat: 24.68862107010728,
            lng: 120.8768248201072
          }
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
      icon_background_color: '#7B9EB0',
      icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
      name: '岩語茶Yan Yu Cha 竹南華東店｜竹南飲料店｜麵茶奶蓋｜黑芝麻奶蓋｜必喝｜厚蓋｜推薦｜奶蓋｜美食｜解渴｜園區團購｜在地飲料｜打卡｜清爽｜消暑',
      opening_hours: {
        open_now: true
      },
      photos: [
        {
          height: 501,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/107811432768071202247">A Google User</a>'
          ],
          photo_reference:
            'AUc7tXWIFVIP2wCuSk6v4X61S9-It1IJrXsQyUXvTzhUfOGiENy6r6XhX1XvlTG0m82I5BMiDpVxwJa7uUOETcdPt2Y4m33zhBvp5yX-EZQem8xamSKYOWXRa338yzXuYm-lJse2rToKqRmeL2Fzc7nLN9Mtfn4o5xOPsPOnHRMqA5wRzN65',
          width: 1242
        }
      ],
      place_id: 'ChIJmb9aC8mzaTQRnCNZyX4W_4s',
      plus_code: {
        compound_code: 'MVRH+27 照南里 苗栗縣竹南鎮',
        global_code: '7QP2MVRH+27'
      },
      rating: 4.7,
      reference: 'ChIJmb9aC8mzaTQRnCNZyX4W_4s',
      types: ['point_of_interest', 'establishment'],
      user_ratings_total: 40
    },
    {
      business_status: 'OPERATIONAL',
      formatted_address: '244台灣新北市林口區中正路10號',
      geometry: {
        location: {
          lat: 25.0775101,
          lng: 121.3962966
        },
        viewport: {
          northeast: {
            lat: 25.07882807989273,
            lng: 121.3976446798927
          },
          southwest: {
            lat: 25.07612842010728,
            lng: 121.3949450201073
          }
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
      icon_background_color: '#7B9EB0',
      icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
      name: '清心福全工六店-珍珠奶茶手搖飲料專賣店',
      opening_hours: {
        open_now: true
      },
      photos: [
        {
          height: 1108,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/105785000333942995854">清心福全冷飲站</a>'
          ],
          photo_reference:
            'AUc7tXWjUFXOO-TZVKl0QsRVIVF06SqAarN498EbCuNTy-lkS8AA83OiNb3bK41MdgjdjWQHnlxgHNfQzl64oJeocvJ9cNmbOd8nkOqKEbjH8jpWzKyQ1-Ct4a7Xgb_7IKL6VLfetsNWiElF1H-vSbUe_2BYDrV2T2JP8YRjSBSmD5gIlxd3',
          width: 1477
        }
      ],
      place_id: 'ChIJBV8Ab_emQjQR_Bdr5JHuN7s',
      plus_code: {
        compound_code: '39HW+2G 林口里 新北市林口區',
        global_code: '7QQ339HW+2G'
      },
      price_level: 1,
      rating: 4,
      reference: 'ChIJBV8Ab_emQjQR_Bdr5JHuN7s',
      types: ['cafe', 'food', 'point_of_interest', 'store', 'establishment'],
      user_ratings_total: 137
    },
    {
      business_status: 'OPERATIONAL',
      formatted_address: '236台灣新北市土城區裕民路97號',
      geometry: {
        location: {
          lat: 24.9870499,
          lng: 121.4507526
        },
        viewport: {
          northeast: {
            lat: 24.98831672989272,
            lng: 121.4520415798927
          },
          southwest: {
            lat: 24.98561707010728,
            lng: 121.4493419201073
          }
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
      icon_background_color: '#7B9EB0',
      icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
      name: '清心福全土城裕生店-珍珠奶茶手搖飲料專賣店',
      opening_hours: {
        open_now: true
      },
      photos: [
        {
          height: 3024,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/111607112584343172010">A Google User</a>'
          ],
          photo_reference:
            'AUc7tXW33TSkrWsY5CDcxjnF2kJ5KSMf639N7Jhc0BAoyKN2B2I1zNPvIgAYeyJWWQ3wQB7bl3PYwS1WSOhSoDa1nNeRHeL6Nkif-faBF0VtMdMN7KBm80d7Bw8zHLfn4VQWyLr3EiixkWlxzFMH4WIp99PzWHZkZMJ6jngRggHtfh5bxEc',
          width: 4032
        }
      ],
      place_id: 'ChIJNfLVLMQCaDQRJkerHT_gE1I',
      plus_code: {
        compound_code: 'XFP2+R8 埤林里 新北市土城區',
        global_code: '7QP3XFP2+R8'
      },
      price_level: 1,
      rating: 3,
      reference: 'ChIJNfLVLMQCaDQRJkerHT_gE1I',
      types: ['point_of_interest', 'establishment'],
      user_ratings_total: 157
    }
  ]

  console.log(drinkList.value)

  // await appStore.openLoader()

  // axios
  //   .get(`http://localhost:${proxyPort}/api/places_nearbysearch`, {
  //     params: {
  //       key: apiKey, // API金鑰
  //       query: '飲料', // 搜尋關鍵字
  //       location: `${lat.value},${lng.value}`, // 經緯度
  //       radius: maxDistance.value * 1000, // 搜尋半徑:(最大50000，單位: 公尺)
  //       // type: 'cafe', // 搜尋類型
  //       language: 'zh-TW', // 語言
  //       opennow: true // 營業中
  //     }
  //   })
  //   .then((response) => {
  //     if (response.data.status === 'OK') {
  //       console.log(response.data.results)

  //       drinkList.value = response.data.results
  //     } else {
  //       throw new Error(response.data.status)
  //     }
  //   })
  //   .catch((error) => {
  //     appStore.openModal({ name: 'error', text: `${error}<br>請聯絡開發者` })
  //   })
  //   .finally(() => {
  //     appStore.closeLoader()
  //   })
}
</script>

<style lang="scss" scoped>
.distance {
  max-width: 100px;
}
</style>
