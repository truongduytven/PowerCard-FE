<TooltipProvider>
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-gray-100 p-3 md:p-6">
    <div className="max-w-7xl mx-auto">

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Right Column - Preview & Actions (1/3 trên desktop) */}
        <div className="space-y-6 sticky top-10">
          <div className="flex-1 ">
            {/* Stats Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Thống kê
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-blue-700">
                      {selectedStudySets.length}
                    </div>
                    <div className="text-xs text-blue-600">Sets</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-green-700">
                      {totalCards}
                    </div>
                    <div className="text-xs text-green-600">Thẻ</div>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-amber-700">
                      {
                        Array.from(
                          new Set(selectedStudySets.map((s) => s.category))
                        ).length
                      }
                    </div>
                    <div className="text-xs text-amber-600">Thể loại</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Xem Trước
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-5 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="text-2xl p-3 rounded-xl bg-opacity-10 group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: formData.iconGradient,
                            backgroundSize: "200% 200%",
                            animation: "gradientShift 5s ease infinite",
                          }}
                        >
                          <SelectedIcon className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1 line-clamp-1">
                            {formData.title || "Tên folder"}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                            {formData.description || "Mô tả folder"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <FolderOpen className="h-4 w-4" />
                        <span>{selectedStudySets.length} decks</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Now
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="flex-1 px-3 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105 shadow-lg shadow-blue-500/30">
                        <ChevronRight className="h-3.5 w-3.5" />
                        Open Folder
                      </button>
                      <button className="p-2 border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 rounded-lg transition-all duration-300">
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customization Section - Collapsible */}
            <Card>
              <CardHeader className="pb-4">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center justify-between w-full"
                >
                  <div className="flex items-center gap-2">
                    <PaletteIcon className="w-5 h-5 text-purple-600" />
                    <CardTitle className="text-lg">Tùy Chỉnh</CardTitle>
                  </div>
                  {showAdvanced ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </CardHeader>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <CardContent className="pt-0 space-y-6">
                      {/* Icon Selection */}
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">
                          Biểu Tượng
                        </Label>
                        <div className="grid grid-cols-4 gap-2">
                          {iconOptions.slice(0, 8).map((option) => {
                            const Icon = option.icon;
                            const isSelected = formData.icon === option.value;
                            return (
                              <button
                                key={option.value}
                                onClick={() =>
                                  handleInputChange("icon", option.value)
                                }
                                className={`p-2 rounded-lg border ${
                                  isSelected
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200"
                                }`}
                              >
                                <div
                                  className="w-8 h-8 rounded flex items-center justify-center mx-auto"
                                  style={{
                                    background: formData.iconGradient,
                                  }}
                                >
                                  <Icon className="w-4 h-4 text-white" />
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Gradient Selection */}
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">
                          Màu Gradient
                        </Label>
                        <div className="grid grid-cols-4 gap-2">
                          {iconGradientOptions.slice(0, 8).map((gradient) => {
                            const isSelected =
                              formData.iconGradient === gradient.value;
                            return (
                              <button
                                key={gradient.value}
                                onClick={() =>
                                  handleInputChange(
                                    "iconGradient",
                                    gradient.value
                                  )
                                }
                                className={`aspect-square rounded border-2 ${
                                  isSelected
                                    ? "border-gray-900 ring-2 ring-blue-500"
                                    : "border-white"
                                }`}
                                style={{ background: gradient.value }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>

          {/* Action Buttons - Sticky trên mobile */}
          <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm pt-4 pb-2 md:pt-6 md:pb-4 space-y-4">
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button
                onClick={handleSubmit}
                size="lg"
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                disabled={
                  !formData.title ||
                  formData.studySets.length === 0 ||
                  isExporting
                }
              >
                <FolderPlus className="w-5 h-5 mr-2" />
                {isExporting ? "Đang tạo..." : "Tạo Folder"}
              </Button>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-11"
                onClick={() => {
                  if (confirm("Bạn có chắc muốn hủy?")) {
                    window.history.back();
                  }
                }}
              >
                Hủy
              </Button>
              <Button
                variant="outline"
                className="h-11"
                onClick={() => {
                  if (confirm("Bạn có chắc muốn đặt lại?")) {
                    setFormData({
                      title: "",
                      description: "",
                      icon: "book",
                      iconGradient:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      studySets: [],
                      tags: [],
                      visibility: "private",
                      colorTheme: "blue",
                      sortOrder: "manual",
                    });
                    toast.success("Đã đặt lại");
                  }
                }}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Đặt lại
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</TooltipProvider>;
