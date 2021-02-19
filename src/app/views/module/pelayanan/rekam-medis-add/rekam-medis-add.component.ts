import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShortcutInput } from 'ng-keyboard-shortcuts';
import {
  CanvasWhiteboardComponent,
  CanvasWhiteboardOptions,
  CanvasWhiteboardService,
  CanvasWhiteboardShapeService,
  CanvasWhiteboardUpdate,
  CircleShape, LineShape, RectangleShape, SmileyShape, StarShape
} from 'ng2-canvas-whiteboard';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../services/auth.service';
import { PelayananService } from '../pelayanan.service';

@Component({
  selector: 'app-rekam-medis-add',
  templateUrl: './rekam-medis-add.component.html',
  styleUrls: ['./rekam-medis-add.component.css'],
})
export class RekamMedisAddComponent implements OnInit, AfterViewInit {
  @ViewChild(CanvasWhiteboardComponent) canvasWhiteboardComponent: CanvasWhiteboardComponent;
  canvasOptions: CanvasWhiteboardOptions = {};
  dataForm: any;
  imageUrl;
  filedUploaded = false;
  aspectRatio;
  isCollapsed: boolean = false;
  shortcuts: ShortcutInput[] = [];
  iconCollapse: string = 'icon-arrow-up';
  nadiAtas = false;
  @ViewChild('jantung') jantung: ElementRef;
  viewSvg;
  constructor(
    private canvasWhiteboardShapeService: CanvasWhiteboardShapeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private authService: AuthService,
    private service: PelayananService,
    private route: Router,
    private paramRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private canvasWhiteboardService: CanvasWhiteboardService
  ) {
    this.dataForm = this.formBuilder.group({
      canvasWhiteboard: []
    });
    this.canvasWhiteboardShapeService.unregisterShapes([CircleShape, SmileyShape, StarShape]);
  }
  ngOnInit() {
    this.canvas();
    this.findOrganById();
  }
  ngAfterViewInit() {
    this.findOrganById();
  }

  findOrganById() {
    const param = { '': '' };
    this.service.findOrganById(param).subscribe(response => {
      const result = response['data'][0].code_svg;
      this.jantung.nativeElement.innerHTML = result;
    });
  }

  canvas() {
    this.canvasOptions = {
      drawButtonEnabled: false,
      drawButtonClass: 'drawButtonClass',
      drawButtonText: 'Drawing',
      drawingEnabled: true,
      clearButtonEnabled: true,
      fillColorPickerEnabled: true,
      clearButtonClass: 'clearButtonClass',
      clearButtonText: 'Clear',
      undoButtonText: 'Undo',
      undoButtonEnabled: true,
      redoButtonText: 'Redo',
      redoButtonEnabled: true,
      saveDataButtonEnabled: true,
      saveDataButtonText: 'Download Gambar',
      colorPickerEnabled: true,
      lineWidth: 5,
      strokeColor: 'rgb(0,0,0)',
      shouldDownloadDrawing: true,
      imageUrl: this.imageUrl,
      aspectRatio: this.aspectRatio
    };
  }

  saveToStorage(): void {
    // Get the current full update history
    const updates: Array<CanvasWhiteboardUpdate> = this.canvasWhiteboardComponent.getDrawingHistory();
    // Stringify the updates, which will return an Array<string>
    updates.push(null);

    const stringifiedUpdatesArray: Array<string> = updates.map(update => update.stringify());
    // Stringify the Array<string> to get a "string", so we are now ready to put this item in the storage
    const stringifiedStorageUpdates: string = JSON.stringify(stringifiedUpdatesArray);
    // Save the item in storage of choice
    this.dataForm.value.canvasWhiteboard = stringifiedStorageUpdates;
    sessionStorage.setItem('canvasWhiteboardDrawings', stringifiedStorageUpdates);
  }
  setNadiAtas(event) {
    this.nadiAtas = !this.nadiAtas;
  }

  loadFromStorage(): void {
    // Get the "string" from the storage
    const canvasDrawingsJson: string = sessionStorage.getItem('canvasWhiteboardDrawings');
    // Null check
    if (canvasDrawingsJson != null) {
      // Parse the string, and get an Array<string>
      const parsedStorageUpdates: Array<string> = JSON.parse(canvasDrawingsJson);
      // Parse each string inside the Array<string>, and get an Array<CanvasWhiteboardUpdate>
      const updates: Array<CanvasWhiteboardUpdate> = parsedStorageUpdates.map(updateJSON =>
        CanvasWhiteboardUpdate.deserializeJson(updateJSON));
      // Draw the updates onto the canvas
      this.canvasWhiteboardService.drawCanvas(updates);
    }
  }

  uploadImageUrl(event) {
    this.readImage(event.target);

  }

  saveImage(event) {
    console.log(event);

  }

  private readImage(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    // myReader.onloadend = (e) => {
    //   this.imageUrl = myReader.result; // Base64 encoding the image
    // };
    myReader.onloadend = (e) => {
      console.log(myReader.result);
      this.imageUrl = myReader.result;
      this.canvas();
    };
    myReader.readAsDataURL(file);

    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = (fn) => {
      this.aspectRatio = (img.naturalHeight / img.naturalWidth); // Calculation of the aspectRatio
      console.log((img.naturalHeight / img.naturalWidth));

      this.filedUploaded = true;
    };
  }
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  add() {
    this.saveToStorage();
    console.log(this.dataForm.value);

  }
}