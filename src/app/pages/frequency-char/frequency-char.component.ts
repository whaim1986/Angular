import {Component, OnInit} from '@angular/core';
import {FileStore} from '../../models/file-store';
import {FileStoreService} from '../../services/file-store.service';
import {NzMessageService} from 'ng-zorro-antd';
import {FileFeatureService} from '../../services/file-feature.service';

declare var require: any;

@Component({
  selector: 'app-frequency-char',
  templateUrl: './frequency-char.component.html',
  styleUrls: ['./frequency-char.component.scss']
})

export class FrequencyCharComponent implements OnInit {
  isSpanning = false;
  file: FileStore = new FileStore();
  charFreq: Map<string, number>;
  option: any;

  constructor(private fileStoreService: FileStoreService,
              private message: NzMessageService,
              private fileFeatureService: FileFeatureService) {
  }

  ngOnInit() {
    require('echarts-wordcloud');
    this.initEcharts();
  }

  initEcharts() {
    this.option = {
      series: [{
        type: 'wordCloud',

        // The shape of the "cloud" to draw. Can be any polar equation represented as a
        // callback function, or a keyword present. Available presents are circle (default),
        // cardioid (apple or heart shape curve, the most known polar equation), diamond (
        // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

        shape: 'circle',

        // A silhouette image which the white area will be excluded from drawing texts.
        // The shape option will continue to apply as the shape of the cloud to grow.

        // maskImage: maskImage,

        // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
        // Default to be put in the center and has 75% x 80% size.

        left: 'center',
        top: 'center',
        width: '70%',
        height: '80%',
        right: null,
        bottom: null,

        // Text size range which the value in data will be mapped to.
        // Default to have minimum 12px and maximum 60px size.

        sizeRange: [12, 60],

        // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

        rotationRange: [-90, 90],
        rotationStep: 45,

        // size of the grid in pixels for marking the availability of the canvas
        // the larger the grid size, the bigger the gap between words.

        gridSize: 8,

        // set to true to allow word being draw partly outside of the canvas.
        // Allow word bigger than the size of the canvas to be drawn
        drawOutOfBound: false,

        // Global text style
        textStyle: {
          normal: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            // Color can be a callback function or a color string
            color() {
              // Random color
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')';
            }
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },

        // Data is an array. Each array item must have name and value property.
        data: [{name: 'hhhh', value: 663}, {name: 'sdfjakdsf', value: 44}]
      }]
    };
  }

  selectFile(id: number) {
    this.isSpanning = true;
    this.fileStoreService.getFile(id).subscribe(it => {
      this.file = it as FileStore;
    }, error => {
      this.message.error(error);
    }, () => {
      this.isSpanning = false;
    });

    this.fileFeatureService.getCharFrequency(id).subscribe(it => {
      this.charFreq = (it as Map<string, number>);
      console.log(this.charFreq);
    });
  }
}
