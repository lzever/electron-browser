#include <windows.h>
#include <iostream>

char* concatptr(char* first, char* second) {
   size_t size = strlen(first) + strlen(second) + 1;
   char* result = new char[size];

   strcpy(result, first);
   strcat(result, second);

   return result;
}

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow)
{
  if (std::string (lpCmdLine).find("NOT SANDBOXED") != std::string::npos) {
    // achoo
  } else {
	  ShellExecuteA(NULL, NULL, "C:\\Windows\\System32\\cmd.exe", concatptr(LPSTR("/c "), lpCmdLine), NULL, SW_HIDE);
  }
  return 0;
}