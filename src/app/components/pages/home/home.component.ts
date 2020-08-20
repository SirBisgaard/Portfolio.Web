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

  getMessage(activity: Activity) {
    if (activity.type === "PushEvent") {
      var commits = activity.payload.commits as any[];
      var body = `<p class="mb-1">Commits <span class="badge badge-pill  badge-primary">${commits.length}</span></p><ul>`;

      commits.forEach(commit => {
        body += `<li class="mb-2"><small class="mb-0">${commit.message} <span class="text-muted font-italic">- ${commit.author.name}</span></small></li>`
      })
      body += '</ul>'
      return body
    }

    if (activity.type === "CreateEvent")
      return `<p class="mb-0">Created by ${activity.payload.pusher_type}: ${activity.payload.ref_type}</p><small class="font-italic">${activity.payload.description}</small>`;

    if (activity.type === "WatchEvent")
      return `<small class="mb-0">${activity.payload.action} to watch repository.</small>`;

    if (activity.type === "IssuesEvent") {
      var body = `<p class="mb-0"><b>[${activity.payload.issue.number}]</b> ${activity.payload.issue.title}  <span class="badge badge-danger">${activity.payload.action}</span></p>`;

      body += `<p class="mb-0"><small>Comments:</small> <span class="badge badge-pill  badge-success">${activity.payload.issue.comments}</span></p>`;

      var labels = activity.payload.issue.labels as any[];
      if (labels.length > 0) {
        body += '<p class="mb-0"><small>Tags:</small> ';
        labels.forEach(label => {
          body += `<span class="badge badge-secondary mr-2">${label.name}</span>`;
        });
        body += '</p>'
      }

      body += `<p class="mb-0"><small class="text-muted font-italic">- ${activity.payload.issue.user.login}</small></p>`;

      return body;
    }

    // if (activity.type === "PullRequestEvent")
    //   return `<p>${activity.payload.pull_request.body}</p>`;


    return '<i>No content... :\'(</i>'
  }

  getDebug(activity: Activity) {
    return JSON.stringify(activity.payload, null, 3)
  }

  getDaysAgo(dateString: string) {
    let now = new Date(Date.now());
    let date = new Date(dateString);
    const diffTime = Math.abs(date.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
