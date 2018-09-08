import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {VideoProviderService} from "../video-provider.service";
import {DPlayerDanmaku, DPlayerVideo} from "dplayer";
import {Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {VideoDTO} from "../videoDTO";

@Component({
  selector: 'app-video',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  dPlayerArguments$: Observable<DPlayerArguments>;

  constructor(private route: ActivatedRoute, private provider: VideoProviderService) {
  }

  ngOnInit() {
    this.dPlayerArguments$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.provider.getVideo(parseInt(params.get('id')))),
      map((video: VideoDTO) => {
        return {
          dPlayerVideo: {
            url: 'https://pan.prprpr.me/?/dplayer/hikarunara.mp4',
            pic: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara.png',
            thumbnails: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara_thumbnails.jpg'
          },
          danmaku: {
            id: '9E2E3368B56CDBB4',
            api: 'https://api.prprpr.me/dplayer3/'
          }
        }
      }));
  }
}

interface DPlayerArguments {
  dPlayerVideo: DPlayerVideo,
  danmaku: DPlayerDanmaku
}
