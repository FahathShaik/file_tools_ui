import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { saveAs } from 'file-saver';
import { Constants } from 'src/app/config/Constants';

import { ApiHttpService } from 'src/app/services/api-http.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  userPdfFile?: File;
  compressedPdf?: File;
  uploadForm?: FormGroup;
  constructor(private apiService: ApiHttpService, private apiUrl: Constants) { }

  ngOnInit(): void {

  }



  onFileSelect(event: any) {
    this.userPdfFile = event.target.files[0];
  }

  compressPdf() {
    if (this.userPdfFile) {
      const url = this.apiUrl.API_ENDPOINT + "/api/compress";
      console.log(this.userPdfFile)
      const formData: FormData = new FormData();
      formData.append('file', this.userPdfFile);
      console.log(formData.getAll('file'))


      this.apiService.post(url, formData).subscribe((data) => {

        let file = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(file);
        // window.open(fileURL);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'compressed.pdf';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
    }
  }
}
