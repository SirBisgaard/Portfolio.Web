import { Component, OnInit } from '@angular/core';
import { GitHubService } from '../../../services/github-service';
import { Activity } from 'src/app/domain/activity';
import { Observable } from 'rxjs';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private gitHubService: GitHubService) { }

  activities$: Observable<Activity[]>;

  ngOnInit(): void {
    this.activities$ = this.gitHubService.getLatestActivity();
  }
  getDaysAgo(dateString: string) {
    let now = new Date(Date.now());
    let date = new Date(dateString);
    const diffTime = Math.abs(date.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
  }
}
